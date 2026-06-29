package com.fhbck.church.controller;

import com.fhbck.church.dto.MediaFileDto;
import com.fhbck.church.service.MediaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name = "Media", description = "File upload and serving endpoints")
public class MediaController {

    private final MediaService mediaService;

    @GetMapping("/api/uploads/{fileName:.+}")
    @Operation(summary = "Serve uploaded files")
    public ResponseEntity<Resource> serveFile(@PathVariable String fileName) {
        var resource = mediaService.loadFile(fileName);
        var contentType = determineContentType(fileName);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @PostMapping("/api/admin/upload")
    @Operation(summary = "Upload a file")
    public ResponseEntity<MediaFileDto> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam(required = false) String altText) {
        return ResponseEntity.ok(mediaService.upload(file, altText));
    }

    @GetMapping("/api/admin/media")
    @Operation(summary = "Get all uploaded media files")
    public ResponseEntity<List<MediaFileDto>> getAllMedia() {
        return ResponseEntity.ok(mediaService.getAll());
    }

    @DeleteMapping("/api/admin/media/{id}")
    @Operation(summary = "Delete a media file")
    public ResponseEntity<Void> deleteMedia(@PathVariable Long id) {
        mediaService.delete(id);
        return ResponseEntity.noContent().build();
    }

    private String determineContentType(String fileName) {
        var ext = fileName.contains(".") ? fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase() : "";
        return switch (ext) {
            case "png" -> "image/png";
            case "jpg", "jpeg" -> "image/jpeg";
            case "gif" -> "image/gif";
            case "webp" -> "image/webp";
            case "svg" -> "image/svg+xml";
            case "pdf" -> "application/pdf";
            case "mp4" -> "video/mp4";
            case "mp3" -> "audio/mpeg";
            default -> "application/octet-stream";
        };
    }
}
