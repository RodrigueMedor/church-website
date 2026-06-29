package com.fhbck.church.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class SermonDto {
    private Long id;
    @NotBlank
    private String title;
    private String description;
    private String speaker;
    private String series;
    private LocalDate datePreached;
    private String bibleVerse;
    private String content;
    private String videoUrl;
    private String audioUrl;
    private String imageUrl;
    private String duration;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
