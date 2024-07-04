package com.danan.userprofile.service.impl;

import com.danan.userprofile.bean.FileInfo;
import com.danan.userprofile.bean.TagInfo;
import com.danan.userprofile.bean.TaskInfo;
import com.danan.userprofile.bean.TaskTagRule;
import com.danan.userprofile.constants.ConstCodes;
import com.danan.userprofile.mapper.TaskInfoMapper;
import com.danan.userprofile.service.FileInfoService;
import com.danan.userprofile.service.TagInfoService;
import com.danan.userprofile.service.TaskInfoService;
import com.danan.userprofile.service.TaskTagRuleService;
import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author zhangchen
 * @since 2021-04-15
 */
@Service
@DS("mysql")
public class TaskInfoServiceImpl extends ServiceImpl<TaskInfoMapper, TaskInfo> implements TaskInfoService {




    @Autowired
    TaskTagRuleService taskTagRuleService;

    @Autowired
    TagInfoService tagInfoService;

    @Autowired
    FileInfoService fileInfoService;
    @Transactional
    public void saveTaskInfoWithTag( TaskInfo taskInfo){
        if(taskInfo.getId()!=null){
            TaskTagRule  taskTagRuleForRm=new TaskTagRule();
            taskTagRuleForRm.setTaskId(taskInfo.getTagId());
            taskTagRuleService.remove(new QueryWrapper<TaskTagRule>().eq("task_id",taskInfo.getId()));
        }
        saveOrUpdate(taskInfo);
        List<TaskTagRule> taskTagRuleList = taskInfo.getTaskTagRuleList();
        if(taskTagRuleList!=null&&taskTagRuleList.size()>0){
            for (TaskTagRule taskTagRule : taskTagRuleList) {
                taskTagRule.setTaskId(taskInfo.getId());
            }
            taskTagRuleService.saveBatch(taskTagRuleList);
        }
        if(taskInfo.getTaskType().equals(ConstCodes.TASK_TYPE_TAG  )){
            TagInfo tagInfoForUpdate = new TagInfo();
            tagInfoForUpdate.setTagTaskId(taskInfo.getId());
            tagInfoForUpdate.setId(taskInfo.getTagId());
            tagInfoService.updateById(tagInfoForUpdate);
        }



    }

    public TaskInfo getTaskInfoWithTag(Long taskId){
        TaskInfo taskInfo =  getById(taskId);
        if(taskInfo.getFileId()!=null){
            FileInfo fileInfo = fileInfoService.getById(taskInfo.getFileId());
            taskInfo.setFileName(fileInfo.getFileName());
            taskInfo.setFilePath(fileInfo.getFilePath());
        }
        List<TaskTagRule> taskTagRuleList = taskTagRuleService.list(new QueryWrapper<TaskTagRule>().eq("task_id", taskId));
        taskInfo.setTaskTagRuleList(taskTagRuleList);
        return  taskInfo;
    }
}
