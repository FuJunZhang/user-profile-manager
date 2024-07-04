package com.danan.upm.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TagInfo {
    private Long id;
    private String tagCode;
    private String tagName;
    private Long tagLevel;
    private Long parentTagID;
    private String tagType;
    private String tagValueType;
    private Long tagTaskId;
    private String tagComment;
    private Timestamp updateTime;
    private Timestamp createTime;
}
