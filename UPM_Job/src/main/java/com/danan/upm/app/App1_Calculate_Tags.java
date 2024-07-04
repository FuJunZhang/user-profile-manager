package com.danan.upm.app;

import com.danan.upm.common.Constant;
import com.danan.upm.pojo.TagInfo;
import com.danan.upm.pojo.TaskInfo;
import com.danan.upm.pojo.TaskTagRule;
import com.danan.upm.service.MySQLDbService;
import com.danan.upm.util.ResourceBundleUtil;
import com.danan.upm.util.SparkSessionUtil;
import com.danan.upm.util.SqlSessionFactoryUtil;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.spark.sql.SparkSession;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author NanHuang
 * @Date 2023/1/19
 */
public class App1_Calculate_Tags {

    /*
        功能：
            从离线数仓（Hive）中查询当日各个标签的计算结果

        用户画像平台与任何交互的参数：
            args[0]:taskId
            args[1]:doDate
    */
    public static void main(String[] args) {
        // 1 获取用户画像平台传入的参数
        String taskId = args[0];
        String doDate = args[1];
        // 2 获取SparkSession对象
        SparkSession ss = SparkSessionUtil.getSparkSession("App1_Calculate_Tags");
        // 3 获取Task元数据
        SqlSessionFactory sqlSessionFactory = SqlSessionFactoryUtil.getSqlSessionFactory(Constant.MYSQL_CONFIG_FILE);
        SqlSession sqlSession = sqlSessionFactory.openSession(true);
        MySQLDbService mySQLDbService = new MySQLDbService(sqlSession);
        TagInfo tagInfo = mySQLDbService.getTagInfoById(taskId);
        TaskInfo taskInfo = mySQLDbService.getTaskInfoById(taskId);
        List<TaskTagRule> taskTagRules = mySQLDbService.getTaskTagRulesById(taskId);
        // 4 获取建表语句
        String createTableSQL = generateCreateTableSQL(tagInfo);
        // 5 获取导数语句
        String insertDataSQL = generateInsertDataSQL(tagInfo, taskInfo, taskTagRules, doDate);
        // 6 执行SQL
        ss.sql(createTableSQL);
        ss.sql(insertDataSQL);

    }

    private static String generateInsertDataSQL(TagInfo tagInfo, TaskInfo taskInfo, List<TaskTagRule> taskTagRules, String doDate) {
        // 1 导数模板
        String template = "insert overwrite table %s.%s partition (dt='%s') " +
                "select user_id,%s " +
                "from (%s) tmp";
        // 2 获取tag_value字段值（处理实际数据与标签值的映射）
        String tagValue = "tag_value";
        if (taskTagRules.size() != 0){
            tagValue = "case tag_value " + taskTagRules.stream().map(r -> String.format("when '%s' then '%s'",r.getQueryValue(),r.getSubTagValue()))
                    .collect(Collectors.joining(" ")) + " end";
        }
        // 3 填充模板
        return String.format(template,
                ResourceBundleUtil.getUpDbName(),//库名
                tagInfo.getTagCode(),//表名
                doDate,//分区
                tagValue,//tag_value字段
                taskInfo.getTaskSql().replace("doDate",doDate));//子查询SQL（要将日期变为系统的时间）
    }

    private static String generateCreateTableSQL(TagInfo tagInfo) {
        // 1 建表模板
        String template = "create table if not exists %s.%s (" +
                "   user_id string," +
                "   tag_value %s" +
                ") comment '%s' " +
                "partitioned by (dt string) " +
                "row format delimited fields terminated by '\\t' " +
                "location '%s/%s'";
        // 2 获取标签值类型
        String valueType = "";
        switch (tagInfo.getTagValueType()){
            case Constant.TAG_VALUE_TYPE_LONG:
                valueType = "bigint";
                break;
            case Constant.TAG_VALUE_TYPE_DECIMAL:
                valueType = "decimal(16,2)";
                break;
            case Constant.TAG_VALUE_TYPE_STRING:
            case Constant.TAG_VALUE_TYPE_DATE:
                valueType = "string";
                break;
        }
        // 3 填充模板
        return String.format(template,
                ResourceBundleUtil.getUpDbName(), //库名
                tagInfo.getTagCode(), //表名
                valueType, //标签值类型
                tagInfo.getTagName(), //标签名
                ResourceBundleUtil.getHDFSPath(), //表在HDFS上的存储路径
                tagInfo.getTagCode());
    }

}
