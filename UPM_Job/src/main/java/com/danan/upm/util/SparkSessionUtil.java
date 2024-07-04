package com.danan.upm.util;

import org.apache.spark.SparkConf;
import org.apache.spark.sql.SparkSession;

/**
 * @author NanHuang
 * @Date 2023/1/19
 */
public class SparkSessionUtil {
    public static SparkSession getSparkSession(String appName){
        // 1 创建配置对象
        SparkConf conf = new SparkConf()
                .setMaster(ResourceBundleUtil.getMasterUrl())
                .setAppName(appName);
        // 2 创建SparkSession对象
        return SparkSession.builder()
                .enableHiveSupport()
                .config(conf)
                .getOrCreate();
    }
}
