package com.danan.userprofile.service;

import com.danan.userprofile.bean.UserGroup;
import com.baomidou.mybatisplus.extension.service.IService;

public interface UserGroupService  extends IService<UserGroup> {


    void writeToMySQL(UserGroup userGroup);

    void writeToClickhouse(UserGroup userGroup);

    void writeToRedis(UserGroup userGroup);

    Long selectResultFromCK(UserGroup userGroup);

    void updateUPResult(String userGroupId, String doDate);

    Long selectResultFromStarrocks(UserGroup userGroup);

    Long selectResultFromStarrocksById(UserGroup userGroup);

    void writeToStarrocks(UserGroup userGroup);

}
