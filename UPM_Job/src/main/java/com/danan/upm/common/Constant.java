package com.danan.upm.common;

/**
 * @author NanHuang
 * @Date 2023/1/19
 */
public class Constant {
    // MyBatis配置文件名
    public static final String MYSQL_CONFIG_FILE = "mysql-config.xml";
    public static final String CLICKHOUSE_CONFIG_FILE = "clickhouse-config.xml";

    // 数字对应的字段类型
    public static final String TAG_VALUE_TYPE_LONG = "1";
    public static final String TAG_VALUE_TYPE_DECIMAL = "2";
    public static final String TAG_VALUE_TYPE_STRING = "3";
    public static final String TAG_VALUE_TYPE_DATE = "4";

    // Clickhouse中初步分区的Bitmap表名
    public static final String BITMAP_TABLE_NAME_DATE = "user_tag_value_date";
    public static final String BITMAP_TABLE_NAME_DECIMAL = "acc_inv_user_tag_num_1d";
    public static final String BITMAP_TABLE_NAME_LONG = "user_tag_value_long";
    public static final String BITMAP_TABLE_NAME_STRING = "acc_inv_user_tag_str_1d";
}
