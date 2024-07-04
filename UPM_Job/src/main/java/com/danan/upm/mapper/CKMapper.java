package com.danan.upm.mapper;

import org.apache.ibatis.annotations.Param;

/**
 * @author NanHuang
 * @Date 2023/1/20
 */
public interface CKMapper {

    void createTable(@Param("tableName")String tableName, @Param("columns")String columns);

    void dropTable(@Param("tableName")String tableName);

    void insertToBitmapTable(@Param("tableName")String tableName,@Param("doDate")String doDate,@Param("subQuery")String subQuery);

    void deleteBitmapTable(@Param("tableName")String tableName,@Param("doDate")String doDate);
}
