package com.fhbck.church.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class TestimonialDto {
    private Long id;
    @NotBlank
    private String name;
    private String title;
    @NotBlank
    private String content;
    private String imageUrl;
    private Boolean active;
    private Integer sortOrder;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
