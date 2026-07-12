package com.fhbck.church.service;

import com.fhbck.church.dto.HeroSlideDto;
import com.fhbck.church.entity.HeroSlide;
import com.fhbck.church.exception.ResourceNotFoundException;
import com.fhbck.church.repository.HeroSlideRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HeroSlideService {

    private final HeroSlideRepository heroSlideRepository;

    private final MessageSource messageSource;

    public List<HeroSlideDto> getActiveSlidesByPage(String page) {
        return heroSlideRepository.findByPageAndActiveTrueOrderBySortOrderAsc(page)
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<HeroSlideDto> getAll() {
        return heroSlideRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    public HeroSlideDto getById(Long id) {
        return toDto(heroSlideRepository.findById(id)
                .orElseThrow(() -> {
                    var locale = LocaleContextHolder.getLocale();
                    return new ResourceNotFoundException(
                            messageSource.getMessage("resource.not-found-with-id", new Object[]{messageSource.getMessage("entity.heroSlide", null, locale), id}, locale));
                }));
    }

    @Transactional
    public HeroSlideDto create(HeroSlideDto dto) {
        var slide = toEntity(dto);
        return toDto(heroSlideRepository.save(slide));
    }

    @Transactional
    public HeroSlideDto update(Long id, HeroSlideDto dto) {
        var slide = heroSlideRepository.findById(id)
                .orElseThrow(() -> {
                    var locale = LocaleContextHolder.getLocale();
                    return new ResourceNotFoundException(
                            messageSource.getMessage("resource.not-found-with-id", new Object[]{messageSource.getMessage("entity.heroSlide", null, locale), id}, locale));
                });
        slide.setTitle(dto.getTitle());
        slide.setSubtitle(dto.getSubtitle());
        slide.setImageUrl(dto.getImageUrl());
        slide.setCtaText(dto.getCtaText());
        slide.setCtaLink(dto.getCtaLink());
        slide.setSortOrder(dto.getSortOrder());
        slide.setActive(dto.getActive());
        slide.setPage(dto.getPage());
        return toDto(heroSlideRepository.save(slide));
    }

    @Transactional
    public void delete(Long id) {
        if (!heroSlideRepository.existsById(id)) {
            var locale = LocaleContextHolder.getLocale();
            throw new ResourceNotFoundException(
                    messageSource.getMessage("resource.not-found-with-id", new Object[]{messageSource.getMessage("entity.heroSlide", null, locale), id}, locale));
        }
        heroSlideRepository.deleteById(id);
    }

    private HeroSlideDto toDto(HeroSlide slide) {
        var dto = new HeroSlideDto();
        dto.setId(slide.getId());
        dto.setTitle(slide.getTitle());
        dto.setSubtitle(slide.getSubtitle());
        dto.setImageUrl(slide.getImageUrl());
        dto.setCtaText(slide.getCtaText());
        dto.setCtaLink(slide.getCtaLink());
        dto.setSortOrder(slide.getSortOrder());
        dto.setActive(slide.getActive());
        dto.setPage(slide.getPage());
        dto.setCreatedAt(slide.getCreatedAt());
        dto.setUpdatedAt(slide.getUpdatedAt());
        return dto;
    }

    private HeroSlide toEntity(HeroSlideDto dto) {
        return HeroSlide.builder()
                .title(dto.getTitle())
                .subtitle(dto.getSubtitle())
                .imageUrl(dto.getImageUrl())
                .ctaText(dto.getCtaText())
                .ctaLink(dto.getCtaLink())
                .sortOrder(dto.getSortOrder() != null ? dto.getSortOrder() : 0)
                .active(dto.getActive() != null ? dto.getActive() : true)
                .page(dto.getPage())
                .build();
    }
}
