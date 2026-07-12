package com.fhbck.church.service;

import com.fhbck.church.dto.GalleryItemDto;
import com.fhbck.church.entity.GalleryItem;
import com.fhbck.church.exception.ResourceNotFoundException;
import com.fhbck.church.repository.GalleryItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GalleryService {

    private final GalleryItemRepository galleryItemRepository;

    private final MessageSource messageSource;

    public List<GalleryItemDto> getAll() {
        return galleryItemRepository.findByActiveTrueOrderBySortOrderAsc()
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<GalleryItemDto> getByCategory(String category) {
        return galleryItemRepository.findByCategoryAndActiveTrueOrderBySortOrderAsc(category)
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Transactional
    public GalleryItemDto create(GalleryItemDto dto) {
        var item = toEntity(dto);
        return toDto(galleryItemRepository.save(item));
    }

    @Transactional
    public GalleryItemDto update(Long id, GalleryItemDto dto) {
        var item = galleryItemRepository.findById(id)
                .orElseThrow(() -> {
                    var locale = LocaleContextHolder.getLocale();
                    return new ResourceNotFoundException(
                            messageSource.getMessage("resource.not-found-with-id", new Object[]{messageSource.getMessage("entity.galleryItem", null, locale), id}, locale));
                });
        item.setTitle(dto.getTitle());
        item.setDescription(dto.getDescription());
        item.setImageUrl(dto.getImageUrl());
        item.setCategory(dto.getCategory());
        item.setActive(dto.getActive());
        item.setSortOrder(dto.getSortOrder());
        return toDto(galleryItemRepository.save(item));
    }

    @Transactional
    public void delete(Long id) {
        if (!galleryItemRepository.existsById(id)) {
            var locale = LocaleContextHolder.getLocale();
            throw new ResourceNotFoundException(
                    messageSource.getMessage("resource.not-found-with-id", new Object[]{messageSource.getMessage("entity.galleryItem", null, locale), id}, locale));
        }
        galleryItemRepository.deleteById(id);
    }

    private GalleryItemDto toDto(GalleryItem g) {
        var dto = new GalleryItemDto();
        dto.setId(g.getId());
        dto.setTitle(g.getTitle());
        dto.setDescription(g.getDescription());
        dto.setImageUrl(g.getImageUrl());
        dto.setCategory(g.getCategory());
        dto.setActive(g.getActive());
        dto.setSortOrder(g.getSortOrder());
        dto.setCreatedAt(g.getCreatedAt());
        dto.setUpdatedAt(g.getUpdatedAt());
        return dto;
    }

    private GalleryItem toEntity(GalleryItemDto dto) {
        return GalleryItem.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .imageUrl(dto.getImageUrl())
                .category(dto.getCategory())
                .active(dto.getActive() != null ? dto.getActive() : true)
                .sortOrder(dto.getSortOrder() != null ? dto.getSortOrder() : 0)
                .build();
    }
}
