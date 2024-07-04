package com.danan.userprofile.controller;


import com.alibaba.fastjson.JSONObject;
import com.danan.userprofile.bean.UserGroup;
import com.danan.userprofile.service.UserGroupService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author zhangchen
 * @since 2021-05-04
 */
@RestController
public class UserGroupController {

    @Autowired
    UserGroupService userGroupService;

    @RequestMapping("/user-group-list")
    @CrossOrigin
    public String  getUserGroupList(@RequestParam("pageNo")int pageNo , @RequestParam("pageSize") int pageSize){
        int startNo=(  pageNo-1)* pageSize;
        int endNo=startNo+pageSize;

        QueryWrapper<UserGroup> queryWrapper = new QueryWrapper<>();
        int count = userGroupService.count(queryWrapper);

        queryWrapper.orderByDesc("id").last(" limit " + startNo + "," + endNo);
        List<UserGroup> userGroupList = userGroupService.list(queryWrapper);

        JSONObject jsonObject = new JSONObject();
        jsonObject.put("detail",userGroupList);
        jsonObject.put("total",count);
        return  jsonObject.toJSONString();
    }

    @PostMapping("/user-group")
    public void userGroup(@RequestBody UserGroup userGroup){
        // 1 将分群条件写入MySQL，确定分群id
        userGroupService.writeToMySQL(userGroup);
        // 2 根据分群id查询分群结果，将结果写入到Clickhouse中的user_group表中
//        userGroupService.writeToClickhouse(userGroup);
        // 2 根据分群id查询分群结果，将结果写入到starrocks中的user_group表中
        userGroupService.writeToStarrocks(userGroup);
        // 3 根据分群id查询Clickhouse中的分群结果，将结果写入Redis
//        userGroupService.writeToRedis(userGroup);
    }

//    @PostMapping("/user-group-evaluate")
//    public Long userGroupEvaluate(@RequestBody UserGroup userGroup){
//        // 直接从Clickhouse中查询结果
//        return userGroupService.selectResultFromCK(userGroup);
//    }

    @PostMapping("/user-group-evaluate")
    public Long userGroupEvaluate(@RequestBody UserGroup userGroup){
        //改为从starrocks中查询结果
        return userGroupService.selectResultFromStarrocks(userGroup);
    }

    @PostMapping("/user-group-refresh/{userGroupId}")
    public void userGroupRefresh(@PathVariable("userGroupId")String userGroupId,
                                 @RequestParam("busiDate")String doDate){
        // 更新数据
        userGroupService.updateUPResult(userGroupId,doDate);
    }


}

