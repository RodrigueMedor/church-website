package com.fhbck.church.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class EventDto {
    private Long id;
    @NotBlank
    private String title;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private String startTime;
    private String endTime;
    private String location;
    private String address;
    private String imageUrl;
    private String category;
    private Boolean featured;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
