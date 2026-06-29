package com.fhbck.church.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class LeaderDto {
    private Long id;
    private String name;
    private String title;
    private String imageUrl;
    private String bio;
    private Integer sortOrder;
    private Boolean active;
    private Long ministryId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
