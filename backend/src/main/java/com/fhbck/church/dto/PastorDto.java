package com.fhbck.church.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class PastorDto {
    private Long id;
    private String name;
    private String title;
    private String imageUrl;
    private String bio;
    private String message;
    private String email;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
