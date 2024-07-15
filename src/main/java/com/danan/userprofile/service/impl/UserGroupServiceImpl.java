package com.danan.userprofile.service.impl;

import com.alibaba.fastjson.JSON;
import com.danan.userprofile.bean.TagCondition;
import com.danan.userprofile.bean.UserGroup;
import com.danan.userprofile.constants.ConstCodes;
import com.danan.userprofile.mapper.UserGroupMapper;
import com.danan.userprofile.service.UserGroupService;
import com.danan.userprofile.utils.RedisUtil;
import com.baomidou.dynamic.datasource.annotation.DS;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import redis.clients.jedis.Jedis;

import java.util.Date;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author zhangchen
 * @since 2021-05-04
 */
@Service
@Slf4j
@DS("mysql")
public class UserGroupServiceImpl extends ServiceImpl<UserGroupMapper, UserGroup> implements UserGroupService {

    @Autowired
    private UserGroupMapper userGroupMapper;

    @Override
    public void writeToMySQL(UserGroup userGroup) {
        // 1 设置conditionJsonStr属性
        userGroup.setConditionJsonStr(JSON.toJSONString(userGroup.getTagConditions()));
        // 2 设置conditionComment属性
        String conditionComment = userGroup.getTagConditions().stream()
                .map(new Function<TagCondition, String>() {
                    @Override
                    public String apply(TagCondition t) {
                        String condition = "";
                        List<String> values = t.getTagValues();
                        if (values.size() == 1) {
                            condition = t.getTagName() + t.getOperatorName() + values.iterator().next();
                        } else {
                            condition = t.getTagName() + t.getOperatorName() +
                                    "(" + values.stream().collect(Collectors.joining(",")) + ")";
                        }
                        return condition;
                    }
                }).collect(Collectors.joining("&"));
        userGroup.setConditionComment(conditionComment);
        // 3 设置createTime属性
        userGroup.setCreateTime(new Date());
        // 4 写入MySQL
        super.save(userGroup);
    }

    @Override
    public void writeToClickhouse(UserGroup userGroup) {
        // 1 获取分群id
        String userGroupId = userGroup.getId() + "";
        // 2 拼接分群查询语句
        String querySQL = "";
        List<TagCondition> conditions = JSON.parseArray(userGroup.getConditionJsonStr(), TagCondition.class);
        String doDate = userGroup.getBusiDate();
        if (conditions.size() == 1) {
            // 单个分群条件
            TagCondition tc = conditions.iterator().next();
            querySQL = generateSingleSQL(tc, doDate);
        } else {
            // 多个分群条件
            querySQL = generateMixSQL(conditions, doDate);
        }
        querySQL = querySQL.substring(6);
        // 3 将查询结果写入Clickhouse(先删再写，保证幂等性)
        userGroupMapper.deleteResultFromCK(userGroupId);
        userGroupMapper.insertResultToCK(userGroupId, querySQL);

    }

    @Override
    public void writeToStarrocks(UserGroup userGroup) {
        // 1 获取分群id
        String userGroupId = userGroup.getId() + "";
        // 2 拼接分群查询语句
        String querySQL = "";
        List<TagCondition> conditions = JSON.parseArray(userGroup.getConditionJsonStr(), TagCondition.class);
        String doDate = userGroup.getBusiDate();
        if (conditions.size() == 1) {
            // 单个分群条件
            TagCondition tc = conditions.iterator().next();
            querySQL = generateSingleSQL(tc, doDate);
            querySQL = querySQL.substring(6);
            System.out.println("单查询条件分群写入starrocks user-group表SQL:[insert into acc_inv_user_group_1d (\n" +
                    "        select]"+querySQL);
        } else {
            // 多个分群条件
            querySQL = generateInsertMixSQL(conditions, doDate,userGroupId);
            System.out.println("多查询条件分群写入starrocks user-group表SQL:[insert into acc_inv_user_group_1d (\n" +
                    "        select]"+querySQL);        }
        // 3 将查询结果写入Clickhouse/starrocks(先删再写，保证幂等性)
        userGroupMapper.deleteResultFromStarrocks(userGroupId);
        userGroupMapper.insertResultToStarrocks(userGroupId, querySQL);
    }



    @Override
    public void writeToRedis(UserGroup userGroup) {
        // 1 获取userGroupId
        String userGroupId = userGroup.getId() + "";
        // 2 从Clickhouse中查询分群结果
        List<String> users = userGroupMapper.selectUPResultById(userGroupId);
        // 3 获取Jedis客户端
        Jedis jedis = RedisUtil.getJedis();
        // 4 先删除指定key的值
        String key = "user_group_id:" + userGroupId;
        jedis.del(key);
        // 4 将结果写入Redis
        for (String user : users) {
            jedis.sadd(key, user);
        }
        // 5 更新MySQL中的user_group_num字段
        userGroup.setUserGroupNum((long) users.size());
        super.saveOrUpdate(userGroup);
        // 6 归还Jedis
        jedis.close();
    }

    @Override
    public Long selectResultFromCK(UserGroup userGroup) {
        // 1 拼接分群查询语句
        String querySQL = "";
        List<TagCondition> conditions = userGroup.getTagConditions();
        String doDate = userGroup.getBusiDate();
        if (conditions.size() == 1) {
            // 单个分群条件
            TagCondition tc = conditions.iterator().next();
            querySQL = generateSingleSQL(tc, doDate);
        } else {
            // 多个分群条件
            querySQL = generateMixSQL(conditions, doDate);
        }
        // 2 查询结果
//        return (long) userGroupMapper.selectUPResult(querySQL).size();
        return 1L;
    }



    @Override
    public Long selectResultFromStarrocks(UserGroup userGroup) {
        // 1 拼接分群查询语句
        String querySQL = "";
        List<TagCondition> conditions = userGroup.getTagConditions();
        String doDate = userGroup.getBusiDate();
        System.out.println(conditions);
        System.out.println(doDate);
        System.out.println("!!!!");
        if (conditions.size() == 1) {
            // 单个分群条件
            TagCondition tc = conditions.iterator().next();
            querySQL = generateSingleSQL(tc, doDate);
        } else {
            // 多个分群条件
            querySQL = generateMixSQL(conditions, doDate);
        }
        // 2 查询结果
        return userGroupMapper.selectUPResult(querySQL);
    }


    @Override
    public Long selectResultFromStarrocksById(UserGroup userGroup) {
        Long id = userGroup.getId();
        // 1 拼接分群查询语句
        String querySQL = "select users from acc_inv_user_group_1d where user_group_id="+id;
        // 2 查询结果
        return userGroupMapper.selectUPResult(querySQL);
    }


    @Override
    public void updateUPResult(String userGroupId, String doDate) {
        // 1 获取MySQL中分组元数据
        UserGroup userGroup = super.getById(userGroupId);

        // 2 更新数据
        userGroup.setUpdateTime(new Date());
        userGroup.setBusiDate(doDate);
//        super.save(userGroup);

//        // 3 重新计算写入Clickhouse
//        writeToClickhouse(userGroup);
        // 3 重新计算写入starrocks
        writeToStarrocks(userGroup);
        // 4 重新计算写入Redis
//        writeToRedis(userGroup);
        long userGroupNum =  selectResultFromStarrocksById(userGroup);
        userGroup.setUserGroupNum(userGroupNum);
        super.saveOrUpdate(userGroup);

    }

    private String generateMixSQL(List<TagCondition> conditions, String doDate) {
        // 1 SQL模板
//        String template = "select bitmapAnd((%s),(%s)) users ";
        // 2 填充模板
        String querySQL = "";
        for (int i = 0; i < conditions.size(); i++) {

            if (i == 0) {
                querySQL += generateSingleSQL(conditions.get(i), doDate);
            } else {
                querySQL += " union all ";
                querySQL += generateSingleSQL(conditions.get(i), doDate);
            }
        }
        return querySQL;
    }


    private String generateInsertMixSQL(List<TagCondition> conditions, String doDate,String userGroupId) {
        // 2 填充模板
        String querySQL = "";
        for (int i = 0; i < conditions.size(); i++) {
            if (i == 0) {
                querySQL += generateSingleSQL(conditions.get(i), doDate);
                querySQL = querySQL;
            } else {
                querySQL += " union all ";
                querySQL += generateSingleSQL(conditions.get(i), doDate) ;
            }
        }
        querySQL=  "bitmap_intersect(users) from (" + querySQL + ")tmp";
        return querySQL;
    }

    private String generateSingleSQL(TagCondition tc, String doDate) {

        String template = "select users from %s " +
                "where dt = '%s' " +
                "and (tag_code = '%s' " +
                "and tag_value %s %s)";


        String template2 = "select bitmap_union(users) as users from %s " +
                "where dt = '%s' " +
                "and (tag_code = '%s' " +
                "and tag_value %s %s)";

        // 2 获取源表名
        String tagCode = tc.getTagCode();
        String sourceTable = "";
        switch (userGroupMapper.selectValueTypeByTagCode(tagCode)) {
            case ConstCodes.TAG_VALUE_TYPE_LONG:
//                sourceTable = ConstCodes.BITMAP_TABLE_NAME_LONG;
                sourceTable = ConstCodes.BITMAP_TABLE_NAME_DECIMAL;
                break;
            case ConstCodes.TAG_VALUE_TYPE_DECIMAL:
                sourceTable = ConstCodes.BITMAP_TABLE_NAME_DECIMAL;
                break;
            case ConstCodes.TAG_VALUE_TYPE_STRING:
                sourceTable = ConstCodes.BITMAP_TABLE_NAME_STRING;
                break;
            case ConstCodes.TAG_VALUE_TYPE_DATE:
//                sourceTable = ConstCodes.BITMAP_TABLE_NAME_DATE;
                sourceTable = ConstCodes.BITMAP_TABLE_NAME_STRING;
                break;
        }
        // 3 获取运算符
        String operatorStr = tc.getOperator();
        String operator = getConditionOperator(operatorStr);
        // 4 获取过滤值
        String value = "'" + "1" + "'";
        List<String> values = tc.getTagValues();

        if (values.size() == 1) {
            value = values.iterator().next();
            if (!sourceTable.equals(ConstCodes.BITMAP_TABLE_NAME_DECIMAL)){
                if("in".equals(operator) || "not in".equals(operator)){
                    value = "('" + value + "')";
                    System.out.println(String.format(template2, sourceTable, doDate, tagCode, operator, value)+"++++++");
                    return String.format(template2, sourceTable, doDate, tagCode, operator, value);
                }
                value = "'" + value + "'";
            }
        } else {
            String finalSourceTable = sourceTable;

            value = "(" + values.stream()
                    .map(new Function<String, String>() {
                        @Override
                        public String apply(String s) {
                            if (!finalSourceTable.equals(ConstCodes.BITMAP_TABLE_NAME_DECIMAL)) {
                                return "'" + s + "'";
                            }
                            ;
                            return s;
                        }
                    }).collect(Collectors.joining(",")) + ")";
            if (!sourceTable.equals(ConstCodes.BITMAP_TABLE_NAME_DECIMAL)) {
                if ("in".equals(operator) || "not in".equals(operator)) {
                    return String.format(template2, sourceTable, doDate, tagCode, operator, value);
                }
            }

        }
        // 5 填充模板
        System.out.println(String.format(template, sourceTable, doDate, tagCode, operator, value)+"==========");
        return String.format(template, sourceTable, doDate, tagCode, operator, value);
    }

    // 定义查询语句中，运算符和运算符编码的对应关系
    private String getConditionOperator(String operator) {

        switch (operator) {
            case "eq":
                return "=";
            case "neq":
                return "<>";
            case "gte":
                return ">=";
            case "lte":
                return "<=";
            case "gt":
                return ">";
            case "lt":
                return "<";
            case "in":
                return "in";
            case "nin":
                return "not in";
        }
        throw new RuntimeException("没有匹配的操作符!");

    }
}
