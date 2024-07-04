package com.danan.upm.service;

import com.danan.upm.mapper.CKMapper;
import org.apache.ibatis.session.SqlSession;

/**
 * @author NanHuang
 * @Date 2023/1/20
 */
public class CKDbService {
    private CKMapper ckMapper;

    public CKDbService(SqlSession session){
        this.ckMapper = session.getMapper(CKMapper.class);
    }

    public void createTable(String tableName,String columns){
        ckMapper.createTable(tableName,columns);
    }

    public void dropTable(String tableName){
        ckMapper.dropTable(tableName);
    }

    public void insertToBitmapTable(String tableName,String doDate,String subQuery){ckMapper.insertToBitmapTable(tableName,doDate,subQuery);}

    public void deleteBitmapTable(String tableName,String doDate){ckMapper.deleteBitmapTable(tableName,doDate);}
}
