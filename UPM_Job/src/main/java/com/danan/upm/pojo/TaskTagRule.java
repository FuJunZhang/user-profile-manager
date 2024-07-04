package com.danan.upm.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskTagRule {
    private Long id;
    private Long tagId;
    private Long taskId;
    private String queryValue;
    private Long subTagId;
    private String subTagValue;
}
