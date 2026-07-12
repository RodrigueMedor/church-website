package com.fhbck.church.service;

import com.fhbck.church.dto.PagedResponse;
import com.fhbck.church.dto.SermonDto;
import com.fhbck.church.entity.Sermon;
import com.fhbck.church.exception.ResourceNotFoundException;
import com.fhbck.church.repository.SermonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SermonService {

    private final SermonRepository sermonRepository;
    private final MessageSource messageSource;

    public PagedResponse<SermonDto> getAll(int page, int size, String keyword) {
        var pageable = PageRequest.of(page, size);
        var result = (keyword != null && !keyword.isBlank())
                ? sermonRepository.searchByKeyword(keyword, pageable)
                : sermonRepository.findByActiveTrueOrderByDatePreachedDesc(pageable);
        var items = result.getContent().stream().map(this::toDto).collect(Collectors.toList());
        return new PagedResponse<>(items, result.getNumber(), result.getSize(),
                result.getTotalElements(), result.getTotalPages(),
                result.isLast(), result.isFirst());
    }

    public SermonDto getById(Long id) {
        return toDto(sermonRepository.findById(id)
                .orElseThrow(() -> {
                    var locale = LocaleContextHolder.getLocale();
                    return new ResourceNotFoundException(
                        messageSource.getMessage("resource.not-found-with-id", new Object[]{messageSource.getMessage("entity.sermon", null, locale), id}, locale));
                }));
    }

    @Transactional
    public SermonDto create(SermonDto dto) {
        var sermon = toEntity(dto);
        return toDto(sermonRepository.save(sermon));
    }

    @Transactional
    public SermonDto update(Long id, SermonDto dto) {
        var sermon = sermonRepository.findById(id)
                .orElseThrow(() -> {
                    var locale = LocaleContextHolder.getLocale();
                    return new ResourceNotFoundException(
                        messageSource.getMessage("resource.not-found-with-id", new Object[]{messageSource.getMessage("entity.sermon", null, locale), id}, locale));
                });
        sermon.setTitle(dto.getTitle());
        sermon.setDescription(dto.getDescription());
        sermon.setSpeaker(dto.getSpeaker());
        sermon.setSeries(dto.getSeries());
        sermon.setDatePreached(dto.getDatePreached());
        sermon.setBibleVerse(dto.getBibleVerse());
        sermon.setContent(dto.getContent());
        sermon.setVideoUrl(dto.getVideoUrl());
        sermon.setAudioUrl(dto.getAudioUrl());
        sermon.setImageUrl(dto.getImageUrl());
        sermon.setDuration(dto.getDuration());
        sermon.setActive(dto.getActive());
        return toDto(sermonRepository.save(sermon));
    }

    @Transactional
    public void delete(Long id) {
        if (!sermonRepository.existsById(id)) {
            var locale = LocaleContextHolder.getLocale();
            throw new ResourceNotFoundException(
                messageSource.getMessage("resource.not-found-with-id", new Object[]{messageSource.getMessage("entity.sermon", null, locale), id}, locale));
        }
        sermonRepository.deleteById(id);
    }

    private SermonDto toDto(Sermon s) {
        var dto = new SermonDto();
        dto.setId(s.getId());
        dto.setTitle(s.getTitle());
        dto.setDescription(s.getDescription());
        dto.setSpeaker(s.getSpeaker());
        dto.setSeries(s.getSeries());
        dto.setDatePreached(s.getDatePreached());
        dto.setBibleVerse(s.getBibleVerse());
        dto.setContent(s.getContent());
        dto.setVideoUrl(s.getVideoUrl());
        dto.setAudioUrl(s.getAudioUrl());
        dto.setImageUrl(s.getImageUrl());
        dto.setDuration(s.getDuration());
        dto.setActive(s.getActive());
        dto.setCreatedAt(s.getCreatedAt());
        dto.setUpdatedAt(s.getUpdatedAt());
        return dto;
    }

    private Sermon toEntity(SermonDto dto) {
        return Sermon.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .speaker(dto.getSpeaker())
                .series(dto.getSeries())
                .datePreached(dto.getDatePreached())
                .bibleVerse(dto.getBibleVerse())
                .content(dto.getContent())
                .videoUrl(dto.getVideoUrl())
                .audioUrl(dto.getAudioUrl())
                .imageUrl(dto.getImageUrl())
                .duration(dto.getDuration())
                .active(dto.getActive() != null ? dto.getActive() : true)
                .build();
    }
}
