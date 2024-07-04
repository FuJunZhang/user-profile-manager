package com.danan.upm.app;

import com.danan.upm.common.Constant;
import com.danan.upm.pojo.TagInfo;
import com.danan.upm.service.CKDbService;
import com.danan.upm.service.MySQLDbService;
import com.danan.upm.util.ResourceBundleUtil;
import com.danan.upm.util.SparkSessionUtil;
import com.danan.upm.util.SqlSessionFactoryUtil;
import org.apache.ibatis.session.SqlSession;
import org.apache.spark.sql.SparkSession;
import scala.collection.immutable.Stream;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author NanHuang
 * @Date 2023/1/20
 */
public class App3_User_Subgroups {
    /*
        功能：
            对用户进行初步分群，以Bitmap格式存储
    */
    public static void main(String[] args) {
        // 1 获取用户画像平台传入的参数
        String doDate = args[1];
        // 2 获取SparkSession对象(不用也要获取，YARN模式执行需要SparkSession环境)
        SparkSession ss = SparkSessionUtil.getSparkSession("App3_User_Subgroups");
        // 3 获取当日运行Task的元数据
        SqlSession sqlSession = SqlSessionFactoryUtil.getSqlSessionFactory(Constant.MYSQL_CONFIG_FILE).openSession(true);
        MySQLDbService mySQLDbService = new MySQLDbService(sqlSession);
        List<TagInfo> tagInfos = mySQLDbService.getTagInfoInUse();
        // 4 对用户分群，将结果写入Clickhouse中
        userSubGroups(tagInfos,doDate);
    }

    private static void userSubGroups(List<TagInfo> tagInfos, String doDate) {
        // 1 元数据分类
        List<TagInfo> dateTi = new ArrayList<>();
        List<TagInfo> longTi = new ArrayList<>();
        List<TagInfo> decimalTi = new ArrayList<>();
        List<TagInfo> stringTi = new ArrayList<>();
        for (TagInfo ti : tagInfos) {
            switch (ti.getTagValueType()){
                case Constant.TAG_VALUE_TYPE_LONG:
                    longTi.add(ti);
                    break;
                case Constant.TAG_VALUE_TYPE_DECIMAL:
                    decimalTi.add(ti);
                    break;
                case Constant.TAG_VALUE_TYPE_STRING:
                    stringTi.add(ti);
                    break;
                case Constant.TAG_VALUE_TYPE_DATE:
                    dateTi.add(ti);
                    break;
            }
        }
        // 2 数据写入
        SqlSession sqlSession = SqlSessionFactoryUtil.getSqlSessionFactory(Constant.CLICKHOUSE_CONFIG_FILE).openSession(true);
        CKDbService ckDbService = new CKDbService(sqlSession);
        String tableName = ResourceBundleUtil.getUpWidePrefix() + doDate.replace("-", "_");//宽表名称
        writeToStringBitmap(ckDbService,stringTi,tableName,doDate);//本项目中只有string和decimal数据类型
        writeToDecimalBitmap(ckDbService,decimalTi,tableName,doDate);
    }

    private static void writeToDecimalBitmap(CKDbService ckDbService,List<TagInfo> decimalTi, String tableName,String doDate) {
        // 1 子查询模板
        String template = "select user_id, %s arr " +
                "from %s";
        // 2 获取字段
        String columns = "[" + decimalTi.stream()
                .map(t -> String.format("('%s',if(%s='','0',%s))",
                        t.getTagCode(),
                        t.getTagCode(),
                        t.getTagCode()))
                .collect(Collectors.joining(",")) + "]";
        // 3 填充模板
        String subQuery = String.format(template, columns, tableName);
        System.out.println(subQuery);
        // 3 向Bitmap表中导入数据(先删，再导，保证幂等性)
        ckDbService.deleteBitmapTable(Constant.BITMAP_TABLE_NAME_DECIMAL,doDate);
        ckDbService.insertToBitmapTable(Constant.BITMAP_TABLE_NAME_DECIMAL,doDate,subQuery);
    }

    private static void writeToStringBitmap(CKDbService ckDbService,List<TagInfo> stringTi, String tableName,String doDate) {
        // 1 子查询模板
        String template = "select user_id, %s arr " +
                "from %s";
        // 2 获取字段
        String columns = "[" + stringTi.stream()
                .map(t -> String.format("('%s',%s)",
                        t.getTagCode(),
                        t.getTagCode()))
                .collect(Collectors.joining(",")) + "]";
        // 3 填充模板
        String subQuery = String.format(template, columns, tableName);
        System.out.println(subQuery);
        // 3 向Bitmap表中导入数据(先删，再导，保证幂等性)
        ckDbService.deleteBitmapTable(Constant.BITMAP_TABLE_NAME_STRING,doDate);
        ckDbService.insertToBitmapTable(Constant.BITMAP_TABLE_NAME_STRING,doDate,subQuery);
    }
}
