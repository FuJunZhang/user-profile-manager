package com.danan.upm.mapper;

import com.danan.upm.pojo.TagInfo;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @author NanHuang
 * @Date 2023/1/19
 */
public interface TagInfoMapper {

    @Select("select * from tag_info where tag_task_id = #{id}")
    TagInfo getTagInfoById(@Param("id") String taskId);

    List<TagInfo> getTagInfoInUse();

}
