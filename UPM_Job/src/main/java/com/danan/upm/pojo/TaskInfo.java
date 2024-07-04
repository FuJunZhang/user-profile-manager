package com.danan.upm.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskInfo {
    private Long id;
    private String taskName;
    private String takeStatus;
    private String taskComment;
    private String taskType;
    private String execType;
    private String mainClass;
    private Long fileId;
    private String taskArgs;
    private String taskSql;
    private Long taskExecLevel;
    private Timestamp createTime;
}
