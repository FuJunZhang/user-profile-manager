package com.danan.upm.app;

import com.danan.upm.common.Constant;
import com.danan.upm.pojo.TagInfo;
import com.danan.upm.service.CKDbService;
import com.danan.upm.service.MySQLDbService;
import com.danan.upm.util.ResourceBundleUtil;
import com.danan.upm.util.SparkSessionUtil;
import com.danan.upm.util.SqlSessionFactoryUtil;
import org.apache.ibatis.session.SqlSession;
import org.apache.spark.sql.SaveMode;
import org.apache.spark.sql.SparkSession;

import java.util.List;
import java.util.Properties;
import java.util.stream.Collectors;

/**
 * @author NanHuang
 * @Date 2023/1/20
 */
public class App2_Merge_WideTable {

    /*
        功能：
            为提高查询效率，将Hive中的标签计算结果写入到Clickhouse中的一张宽表中（一天一张表）
    */
    public static void main(String[] args) {
        // 1 获取用户画像平台传入的参数
        String doDate = args[1];
        // 2 获取SparkSession对象
        SparkSession ss = SparkSessionUtil.getSparkSession("App2_Merge_WideTable");
        // 3 获取当日启用Task的元数据
        SqlSession sqlSession = SqlSessionFactoryUtil.getSqlSessionFactory(Constant.MYSQL_CONFIG_FILE).openSession(true);
        MySQLDbService mySQLDbService = new MySQLDbService(sqlSession);
        List<TagInfo> tagInfos = mySQLDbService.getTagInfoInUse();
        // 4 获取Clickhouse中宽表的表名
        String tableName = ResourceBundleUtil.getUpWidePrefix() + doDate.replace("-", "_"); //表名格式：前缀 + 日期
        // 5 在Clickhouse中创建宽表
        createCKWideTable(tagInfos,tableName);
        // 6 向Clickhouse的宽表中写入数据
        // 6.1 拼接查询语句（Pivot，列转行，只有SparkSQL和Oracle中支持）
        String selectSQL = generateSelectSQL(tagInfos, doDate);
        // 6.2 将查询结果写入Clickhouse宽表
        ss.sql(selectSQL)//查询Hive
                .write()//将Hive的查询结果写到Clickhouse
                .mode(SaveMode.Append)
                .option("driver",ResourceBundleUtil.getCKDriver())
                .option("batchSize",500)
                .option("isolationLevel","NONE")//关闭事务
                .option("numPartitions","4")//设置并发
                .jdbc(ResourceBundleUtil.getCKUrl(),tableName,new Properties());
    }

    private static String generateSelectSQL(List<TagInfo> tagInfos,String doDate) {
        // 1 查询SQL模板
        String template = "select * " +
                "from (%s) " +
                "pivot (" +
                "   min(tag_value) " +
                "   for tag_code in (%s)" +
                ")";
        // 2 拼接子查询语句
        String subQuery = tagInfos.stream()
                .map(t -> String.format("select user_id,tag_value,'%s' tag_code from %s.%s where dt = '%s'",
                        t.getTagCode(),//Hive中的表名，作为宽表中的字段名
                        ResourceBundleUtil.getUpDbName(),//Hive的库名
                        t.getTagCode(),
                        doDate))//执行日期
                .collect(Collectors.joining(" union all "));
        // 3 拼接行字段
        String columns = tagInfos.stream()
                .map(t -> String.format("'%s'", t.getTagCode()))
                .collect(Collectors.joining(","));
        return String.format(template,subQuery,columns);
    }

    private static void createCKWideTable(List<TagInfo> tagInfos, String tableName) {
        // 1 拼接宽表字段
        String columns = tagInfos.stream()
                .map(t -> t.getTagCode() + " String")
                .collect(Collectors.joining(","));
        // 2 Clickhouse中建表(先删再建，保证数据幂等性)
        SqlSession sqlSession = SqlSessionFactoryUtil.getSqlSessionFactory(Constant.CLICKHOUSE_CONFIG_FILE).openSession(true);
        CKDbService ckDbService = new CKDbService(sqlSession);
        ckDbService.dropTable(tableName);//删除表
        ckDbService.createTable(tableName,columns);//创建表

    }

}
