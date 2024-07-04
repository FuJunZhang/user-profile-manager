package com.danan.upm.service;

import com.danan.upm.mapper.TagInfoMapper;
import com.danan.upm.mapper.TaskInfoMapper;
import com.danan.upm.mapper.TaskTagRuleMapper;
import com.danan.upm.pojo.TagInfo;
import com.danan.upm.pojo.TaskInfo;
import com.danan.upm.pojo.TaskTagRule;
import org.apache.ibatis.session.SqlSession;

import java.util.List;

/**
 * @author NanHuang
 * @Date 2023/1/19
 */
public class MySQLDbService {
    private TagInfoMapper tagInfoMapper;
    private TaskInfoMapper taskInfoMapper;
    private TaskTagRuleMapper taskTagRuleMapper;

    public MySQLDbService(SqlSession session){
        this.tagInfoMapper = session.getMapper(TagInfoMapper.class);
        this.taskInfoMapper = session.getMapper(TaskInfoMapper.class);
        this.taskTagRuleMapper = session.getMapper(TaskTagRuleMapper.class);
    }

    public TagInfo getTagInfoById(String taskId){
        return tagInfoMapper.getTagInfoById(taskId);
    }

    public TaskInfo getTaskInfoById(String taskId){
        return taskInfoMapper.getTaskInfoById(taskId);
    }

    public List<TaskTagRule> getTaskTagRulesById(String taskId){
        return taskTagRuleMapper.getTaskTagRulesById(taskId);
    }

    public List<TagInfo> getTagInfoInUse(){
        return tagInfoMapper.getTagInfoInUse();
    }
}
