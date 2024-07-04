package com.danan.userprofile.mapper;

import com.danan.userprofile.bean.UserGroup;
import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author zhangchen
 * @since 2021-05-04
 */


@Mapper
@DS("mysql")
public interface UserGroupMapper extends BaseMapper<UserGroup> {

    @DS("ck")
    void insertResultToCK(@Param("userGroupId") String userGroupId, @Param("querySQL") String querySQL);

    @DS("starrocks")
    void insertResultToStarrocks(@Param("userGroupId") String userGroupId, @Param("querySQL") String querySQL);

    @DS("ck")
    @Update("alter table acc_inv_user_group_1d delete where user_group_id = #{userGroupId}")
    void deleteResultFromCK(@Param("userGroupId") String userGroupId);

    @DS("starrocks")
    @Update("DELETE FROM acc_inv_user_group_1d WHERE user_group_id = #{userGroupId}")
    void deleteResultFromStarrocks(@Param("userGroupId") String userGroupId);

    @DS("mysql")
    String selectValueTypeByTagCode(@Param("tagCode") String tagCode);

    @DS("ck")
    @Select("select arrayJoin(bitmapToArray(users)) from acc_inv_user_group_1d where user_group_id = #{userGroupId}")
    List<String> selectUPResultById(@Param("userGroupId") String userGroupId);

//    @DS("ck")
//    @Select("select arrayJoin(bitmapToArray(users)) from (${querySQL}) tmp")
//    List<String> selectUPResult(@Param("querySQL") String querySQL);

    @DS("starrocks")
//    @Select("select unnest_bitmap from (${querySQL})tmp, unnest_bitmap(users) ")
//    @Select("select unnest from (${querySQL})tmp, unnest(bitmap_to_array(users))")
//    List<String> selectUPResult(@Param("querySQL") String querySQL);
//    @Select("select sum(bitmap_count(users)) from (${querySQL})tmp")
    @Select("select bitmap_count(bitmap_intersect(users)) from (${querySQL})tmp")
    Long selectUPResult(@Param("querySQL") String querySQL);
}
