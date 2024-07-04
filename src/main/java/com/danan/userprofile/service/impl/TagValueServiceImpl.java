package com.danan.userprofile.service.impl;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.danan.userprofile.bean.TagValue;
import com.danan.userprofile.mapper.TagValueMapper;
import com.danan.userprofile.service.TagValueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author zhangchen
 * @since 2021-04-13
 */
@Service
@DS("mysql")
public class TagValueServiceImpl extends ServiceImpl<TagValueMapper, TagValue> implements TagValueService {

    @Autowired
    TagValueMapper tagValueMapper;


    @Override
    public List<TagValue> getTagValuesByTagCode(String tagCode) {
//        System.out.println(tagCode+"==============serviceimpl tagcode");
//        System.out.println(tagValueMapper.selectTagValuesByTagCode(tagCode)+"===========serviceimpl tagvalue");
        return tagValueMapper.selectTagValuesByTagCode(tagCode);
    }

}
