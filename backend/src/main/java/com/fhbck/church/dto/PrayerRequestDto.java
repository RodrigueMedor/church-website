package com.fhbck.church.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class PrayerRequestDto {
    private Long id;
    private String name;
    private String email;
    private String request;
    private Boolean isPublic;
    private Boolean prayed;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
