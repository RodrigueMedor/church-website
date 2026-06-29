package com.fhbck.church.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class NewsArticleDto {
    private Long id;
    @NotBlank
    private String title;
    private String excerpt;
    private String content;
    private String imageUrl;
    private String author;
    private Boolean featured;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
