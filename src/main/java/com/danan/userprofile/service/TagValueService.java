package com.danan.userprofile.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.danan.userprofile.bean.TagInfo;
import com.danan.userprofile.bean.TagValue;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author zhangchen
 * @since 2021-04-13
 */
public interface TagValueService extends IService<TagValue> {

    List<TagValue> getTagValuesByTagCode(String tagCode);
}
