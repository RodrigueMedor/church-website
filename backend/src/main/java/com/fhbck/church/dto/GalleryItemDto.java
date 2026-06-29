package com.fhbck.church.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class GalleryItemDto {
    private Long id;
    @NotBlank
    private String title;
    private String description;
    @NotBlank
    private String imageUrl;
    private String category;
    private Boolean active;
    private Integer sortOrder;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
