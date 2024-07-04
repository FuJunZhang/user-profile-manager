package com.danan.userprofile.controller;


import com.alibaba.fastjson.JSON;
import com.danan.userprofile.bean.TagOption;
import com.danan.userprofile.bean.TagInfo;
import com.danan.userprofile.bean.TagTreeNode;
import com.danan.userprofile.bean.TagValue;
import com.danan.userprofile.service.FileInfoService;
import com.danan.userprofile.service.TagInfoService;
import com.danan.userprofile.service.TagValueService;
import com.danan.userprofile.service.TaskInfoService;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author zhangchen
 * @since 2021-04-13
 */
@RestController
public class TagInfoController {
    @Autowired
    TagInfoService tagInfoService;

    @Autowired
    TagValueService tagValueService;

    @Autowired
    TaskInfoService taskInfoService;

    @Autowired
    FileInfoService fileInfoService;



    @GetMapping("/taginfo/{tagId}")
    @CrossOrigin
    public String getTagInfo(@PathVariable("tagId") Long tagId){
        TagInfo tagInfo = tagInfoService.getTagInfo(tagId);
        return  JSON.toJSONString(tagInfo) ;
    }

    @PostMapping("taginfo")
    @CrossOrigin
    public void saveTagInfo(@RequestBody TagInfo tagInfo){
        if(tagInfo.getId()==null){
            tagInfo.setCreateTime(new Date());
        }
        tagInfoService.saveOrUpdate(tagInfo);
    }

    @RequestMapping("taglist")
    @CrossOrigin
    public String tagInfoList(){

        List<TagInfo> tagInfoList = tagInfoService.getTagInfoAllWithStatus();
        List<TagTreeNode> tagTreeNodeList = tagInfoList.stream().map(tagInfo -> new TagTreeNode(tagInfo)).collect(Collectors.toList());

        Map<String ,TagTreeNode> tagTreeNodeMap = new HashMap();
        List<TagTreeNode> headTreeNodeList=new ArrayList<>();

        //采用map缓存策略  相比双层for 和 递归  ，循环次数少，不容易栈溢出，但是需要数据层级有序 （子辈必须在父辈后面）
        for (TagTreeNode tagTreeNode : tagTreeNodeList) {
            if(tagTreeNode.getParentTagId()==null){
                headTreeNodeList.add(tagTreeNode);
            }else{
                //加入长辈的孩子集合
                TagTreeNode parentTagTreeNode = tagTreeNodeMap.get(tagTreeNode.getParentTagId());
                List<TagTreeNode> broTagTreeNodeList = parentTagTreeNode.getChildren();
                broTagTreeNodeList.add(tagTreeNode);
            }
            //把自己加入集合
            tagTreeNodeMap.put(tagTreeNode.getId(),tagTreeNode);
        }
        String tagJson = JSON.toJSONString(headTreeNodeList);
        System.out.println(tagJson);

        return tagJson;
    }


    @RequestMapping("subtags/{parentTagId}")
    @CrossOrigin
    public String tagInfoList(@PathVariable("parentTagId") String parentTagId){

        List<TagInfo> subTagInfoList = tagInfoService.list(new QueryWrapper<TagInfo>().eq("parent_tag_id", Long.valueOf(parentTagId)));

        String tagJson = JSON.toJSONString(subTagInfoList);
        System.out.println(tagJson);

        return tagJson;
    }

    // 定义一个处理请求的映射，路径为 "/tag-cascader/{level}"，其中 {level} 是路径变量，表示标签的层级
    @RequestMapping("/tag-cascader/{level}")
    // 允许跨域请求
    @CrossOrigin
    public String tagsCascader(@PathVariable("level") Long level){
        // 使用标签信息服务获取标签信息列表，按照 tag_level 小于等于指定层级 level 进行排序
        List<TagInfo> tagInfoList = tagInfoService.list(new QueryWrapper<TagInfo>().le("tag_level",level).orderByAsc("tag_level"));
        // 将标签信息列表转换为标签选项列表
        List<TagOption> tagOptionList = tagInfoList.stream().map(tagInfo -> new TagOption(tagInfo)).collect(Collectors.toList());

        // 创建一个映射用于存储标签选项，键为标签的标识 ID
        Map<Long , TagOption> tagOptionMap = new HashMap();
        // 创建一个列表存储顶级标签选项
        List<TagOption> headTagOptionList =new ArrayList<>();


        //采用map缓存策略  相比双层for 和 递归  ，循环次数少，不容易栈溢出，但是需要数据层级有序 （子辈必须在父辈后面）
        // 遍历标签选项列表，根据父标签 ID 将子标签加入到对应的父标签的 children 列表中
        for (TagOption tagOption : tagOptionList) {
            if(tagOption.getParentTagId()==null){
                // 如果标签没有父标签，将其添加到顶级标签选项列表中
                headTagOptionList.add(tagOption);
            }else{
                //加入长辈的孩子集合
                // 如果标签有父标签，将其添加到对应父标签的 children 列表中
                TagOption parentTagOption = tagOptionMap.get(tagOption.getParentTagId());
                if(parentTagOption.getChildren()==null){
                    parentTagOption.setChildren(new ArrayList<>());
                }
                List<TagOption> broTagOptionList = parentTagOption.getChildren();
                broTagOptionList.add(tagOption);
            }
            //把自己加入集合
            // 将当前标签选项加入映射中，以便后续查找其父标签
            tagOptionMap.put(tagOption.getTagId(), tagOption);
        }
        String tagJson = JSON.toJSONString(headTagOptionList);
        System.out.println(tagJson);
        return tagJson;
    }

    @RequestMapping("/tag-value-list/{parentTagCode}")
    @CrossOrigin
    public String getTagValueList(@PathVariable("parentTagCode") String parentTagCode){
        List<TagInfo> tagValueList = tagInfoService.getTagValueList(parentTagCode);
        List<TagOption> tagOptionList = tagValueList.stream().map(tagInfo -> new TagOption(tagInfo)).collect(Collectors.toList());

        return JSON.toJSONString(tagOptionList);
    }

    @DeleteMapping("/taginfo/{id}")
    @CrossOrigin
    public String deleteTagInfo(@PathVariable("id") Long tagId){
        tagInfoService.removeById(tagId);
        return "success";
    }

    @GetMapping("/tagcode-tagvalue/{tagCode}")
    @CrossOrigin
    public String getTagValuesByTagCode(@PathVariable("tagCode") String tagCode) {
        List<TagValue> tagValues = tagValueService.getTagValuesByTagCode(tagCode);
        return JSON.toJSONString(tagValues);
    }
}

