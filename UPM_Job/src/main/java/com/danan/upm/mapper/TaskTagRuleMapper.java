package com.danan.upm.mapper;

import com.danan.upm.pojo.TaskTagRule;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @author NanHuang
 * @Date 2023/1/19
 */
public interface TaskTagRuleMapper {

    @Select("select r.*,ti.tag_name sub_tag_value " +
            "from task_tag_rule r " +
            "join tag_info ti on ti.id=r.sub_tag_id " +
            "where r.task_id=#{id}")
    List<TaskTagRule> getTaskTagRulesById(@Param("id") String taskId);

}
