package com.danan.userprofile.mapper;

import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.danan.userprofile.bean.TagValue;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author zhangchen
 * @since 2021-04-13
 */
public interface TagValueMapper extends BaseMapper<TagValue>  {


    @DS("mysql")
    @Select("select value, value as label from tag_value where tag_code = #{tagCode}")
    public  List<TagValue> selectTagValuesByTagCode(String tagCode);

}
