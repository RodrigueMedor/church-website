package com.fhbck.church.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class MinistryDto {
    private Long id;
    @NotBlank
    private String name;
    private String tagline;
    private String description;
    private String longDescription;
    private String imageUrl;
    private String heroImagePosition;
    private String meetingTime;
    private String meetingLocation;
    private String contactEmail;
    private Integer sortOrder;
    private Boolean active;
    @NotBlank
    private String slug;
    private List<LeaderDto> leaders;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
