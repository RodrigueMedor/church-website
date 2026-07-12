package com.fhbck.church.service;

import com.fhbck.church.dto.TestimonialDto;
import com.fhbck.church.entity.Testimonial;
import com.fhbck.church.exception.ResourceNotFoundException;
import com.fhbck.church.repository.TestimonialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TestimonialService {

    private final TestimonialRepository testimonialRepository;
    private final MessageSource messageSource;

    public List<TestimonialDto> getAll() {
        return testimonialRepository.findByActiveTrueOrderBySortOrderAsc()
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Transactional
    public TestimonialDto create(TestimonialDto dto) {
        var testimonial = toEntity(dto);
        return toDto(testimonialRepository.save(testimonial));
    }

    @Transactional
    public TestimonialDto update(Long id, TestimonialDto dto) {
        var t = testimonialRepository.findById(id)
                .orElseThrow(() -> {
                    var locale = LocaleContextHolder.getLocale();
                    return new ResourceNotFoundException(
                        messageSource.getMessage("resource.not-found-with-id", new Object[]{messageSource.getMessage("entity.testimonial", null, locale), id}, locale));
                });
        t.setName(dto.getName());
        t.setTitle(dto.getTitle());
        t.setContent(dto.getContent());
        t.setImageUrl(dto.getImageUrl());
        t.setActive(dto.getActive());
        t.setSortOrder(dto.getSortOrder());
        return toDto(testimonialRepository.save(t));
    }

    @Transactional
    public void delete(Long id) {
        if (!testimonialRepository.existsById(id)) {
            var locale = LocaleContextHolder.getLocale();
            throw new ResourceNotFoundException(
                messageSource.getMessage("resource.not-found-with-id", new Object[]{messageSource.getMessage("entity.testimonial", null, locale), id}, locale));
        }
        testimonialRepository.deleteById(id);
    }

    private TestimonialDto toDto(Testimonial t) {
        var dto = new TestimonialDto();
        dto.setId(t.getId());
        dto.setName(t.getName());
        dto.setTitle(t.getTitle());
        dto.setContent(t.getContent());
        dto.setImageUrl(t.getImageUrl());
        dto.setActive(t.getActive());
        dto.setSortOrder(t.getSortOrder());
        dto.setCreatedAt(t.getCreatedAt());
        dto.setUpdatedAt(t.getUpdatedAt());
        return dto;
    }

    private Testimonial toEntity(TestimonialDto dto) {
        return Testimonial.builder()
                .name(dto.getName())
                .title(dto.getTitle())
                .content(dto.getContent())
                .imageUrl(dto.getImageUrl())
                .active(dto.getActive() != null ? dto.getActive() : true)
                .sortOrder(dto.getSortOrder() != null ? dto.getSortOrder() : 0)
                .build();
    }
}
