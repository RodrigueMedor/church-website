package com.fhbck.church.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ChurchSettingDto {
    private Long id;
    private String settingKey;
    private String settingValue;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
