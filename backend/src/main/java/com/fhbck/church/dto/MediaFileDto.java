package com.fhbck.church.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class MediaFileDto {
    private Long id;
    private String fileName;
    private String filePath;
    private String fileType;
    private Long fileSize;
    private String mimeType;
    private String altText;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
