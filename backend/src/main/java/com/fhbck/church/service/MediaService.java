package com.fhbck.church.service;

import com.fhbck.church.dto.MediaFileDto;
import com.fhbck.church.entity.MediaFile;
import com.fhbck.church.repository.MediaFileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MediaService {

    private final MediaFileRepository mediaFileRepository;

    @Value("${app.upload.dir:/app/uploads}")
    private String uploadDir;

    public List<MediaFileDto> getAll() {
        return mediaFileRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    public Resource loadFile(String fileName) {
        try {
            var path = Paths.get(uploadDir).resolve(fileName).normalize();
            var resource = new UrlResource(path.toUri());
            if (resource.exists() && resource.isReadable()) {
                return resource;
            }
            throw new RuntimeException("File not found: " + fileName);
        } catch (MalformedURLException e) {
            throw new RuntimeException("File not found: " + fileName, e);
        }
    }

    @Transactional
    public MediaFileDto upload(MultipartFile file, String altText) {
        try {
            var uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            var originalName = file.getOriginalFilename();
            var extension = "";
            if (originalName != null && originalName.contains(".")) {
                extension = originalName.substring(originalName.lastIndexOf("."));
            }
            var storedName = UUID.randomUUID().toString() + extension;

            var targetPath = uploadPath.resolve(storedName);
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            var mediaFile = MediaFile.builder()
                    .fileName(originalName)
                    .filePath("/api/uploads/" + storedName)
                    .fileType(determineFileType(file.getContentType()))
                    .fileSize(file.getSize())
                    .mimeType(file.getContentType())
                    .altText(altText)
                    .build();

            return toDto(mediaFileRepository.save(mediaFile));
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file", e);
        }
    }

    @Transactional
    public void delete(Long id) {
        var mediaFile = mediaFileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("File not found: " + id));
        try {
            var fileName = mediaFile.getFilePath().substring(mediaFile.getFilePath().lastIndexOf("/") + 1);
            Files.deleteIfExists(Paths.get(uploadDir).resolve(fileName));
        } catch (IOException ignored) {}
        mediaFileRepository.deleteById(id);
    }

    private String determineFileType(String mimeType) {
        if (mimeType == null) return "other";
        if (mimeType.startsWith("image/")) return "image";
        if (mimeType.startsWith("video/")) return "video";
        if (mimeType.startsWith("audio/")) return "audio";
        if (mimeType.equals("application/pdf")) return "document";
        return "other";
    }

    private MediaFileDto toDto(MediaFile f) {
        var dto = new MediaFileDto();
        dto.setId(f.getId());
        dto.setFileName(f.getFileName());
        dto.setFilePath(f.getFilePath());
        dto.setFileType(f.getFileType());
        dto.setFileSize(f.getFileSize());
        dto.setMimeType(f.getMimeType());
        dto.setAltText(f.getAltText());
        dto.setActive(f.getActive());
        dto.setCreatedAt(f.getCreatedAt());
        dto.setUpdatedAt(f.getUpdatedAt());
        return dto;
    }
}
