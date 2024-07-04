package com.danan.upm.util;

import java.util.ResourceBundle;

/**
 * @author NanHuang
 * @Date 2023/1/19
 */
public class ResourceBundleUtil {

    private static ResourceBundle rb;

    static {
        rb = ResourceBundle.getBundle("config");
    }

    public static String getHDFSPath(){
        return rb.getString("hdfsPath");
    }

    public static String getUpDbName(){
        return rb.getString("updbname");
    }

    public static String getUpWidePrefix(){
        return rb.getString("upwideprefix");
    }

    public static String getMasterUrl(){
        return rb.getString("masterUrl");
    }

    public static String getCKDriver(){return rb.getString("ck.jdbc.driver.name");}

    public static String getCKUrl(){return rb.getString("ck.jdbc.url");}

    public static string
}
