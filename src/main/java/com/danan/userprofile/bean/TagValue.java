package com.danan.userprofile.bean;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
/**
 * @author zfj
 * @create 2024-06-27 17:15
 */
public class TagValue implements Serializable {
    private String value;
    private String label;


    private static final long serialVersionUID = 1L;

    // getter 和 setter 方法
    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}
