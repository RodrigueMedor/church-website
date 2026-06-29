package com.fhbck.church.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class HeroSlideDto {
    private Long id;
    @NotBlank
    private String title;
    private String subtitle;
    private String imageUrl;
    private String ctaText;
    private String ctaLink;
    private Integer sortOrder;
    private Boolean active;
    private String page;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
