package com.danan.upm.mapper;

import com.danan.upm.pojo.TaskInfo;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

/**
 * @author NanHuang
 * @Date 2023/1/19
 */
public interface TaskInfoMapper {

    @Select("select * from task_info where id = #{id}")
    TaskInfo getTaskInfoById(@Param("id") String taskId);

}
