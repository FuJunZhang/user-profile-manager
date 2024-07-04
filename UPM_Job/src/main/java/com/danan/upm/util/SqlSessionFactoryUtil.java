package com.danan.upm.util;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;

/**
 * @author NanHuang
 * @Date 2023/1/19
 */
public class SqlSessionFactoryUtil {

    // 根据配置文件获取SqlSessionFactory对象
    public static SqlSessionFactory getSqlSessionFactory(String configFileName){
        InputStream rs = null;
        SqlSessionFactory ssf = null;
        try {
            // 1 读取MyBatis的核心配置文件
            rs = Resources.getResourceAsStream(configFileName);
            // 2 获取工厂类
            SqlSessionFactoryBuilder sfb = new SqlSessionFactoryBuilder();
            ssf = sfb.build(rs);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            try {
                rs.close();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        return ssf;
    }

}
