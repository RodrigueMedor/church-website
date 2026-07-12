package com.fhbck.church.service;

import com.fhbck.church.dto.EventDto;
import com.fhbck.church.dto.PagedResponse;
import com.fhbck.church.entity.Event;
import com.fhbck.church.exception.ResourceNotFoundException;
import com.fhbck.church.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final MessageSource messageSource;

    public PagedResponse<EventDto> getAll(int page, int size, String keyword, String category) {
        var pageable = PageRequest.of(page, size);
        var result = (keyword != null && !keyword.isBlank())
                ? eventRepository.searchByKeyword(keyword, pageable)
                : (category != null && !category.isBlank())
                    ? eventRepository.findByCategoryAndActiveTrue(category, pageable)
                    : eventRepository.findByActiveTrueOrderByStartDateDesc(pageable);
        var items = result.getContent().stream().map(this::toDto).collect(Collectors.toList());
        return new PagedResponse<>(items, result.getNumber(), result.getSize(),
                result.getTotalElements(), result.getTotalPages(),
                result.isLast(), result.isFirst());
    }

    public List<EventDto> getUpcoming() {
        return eventRepository.findByStartDateAfterAndActiveTrueOrderByStartDateAsc(LocalDate.now())
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<EventDto> getFeatured() {
        return eventRepository.findByFeaturedTrueAndActiveTrueOrderByStartDateAsc()
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    public EventDto getById(Long id) {
        return toDto(eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("resource.not-found-with-id", new Object[]{messageSource.getMessage("entity.event", null, LocaleContextHolder.getLocale()), id}, LocaleContextHolder.getLocale()))));
    }

    @Transactional
    public EventDto create(EventDto dto) {
        var event = toEntity(dto);
        return toDto(eventRepository.save(event));
    }

    @Transactional
    public EventDto update(Long id, EventDto dto) {
        var event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("resource.not-found-with-id", new Object[]{messageSource.getMessage("entity.event", null, LocaleContextHolder.getLocale()), id}, LocaleContextHolder.getLocale())));
        event.setTitle(dto.getTitle());
        event.setDescription(dto.getDescription());
        event.setStartDate(dto.getStartDate());
        event.setEndDate(dto.getEndDate());
        event.setStartTime(dto.getStartTime());
        event.setEndTime(dto.getEndTime());
        event.setLocation(dto.getLocation());
        event.setAddress(dto.getAddress());
        event.setImageUrl(dto.getImageUrl());
        event.setCategory(dto.getCategory());
        event.setFeatured(dto.getFeatured());
        event.setActive(dto.getActive());
        return toDto(eventRepository.save(event));
    }

    @Transactional
    public void delete(Long id) {
        if (!eventRepository.existsById(id)) {
            var locale = LocaleContextHolder.getLocale();
            throw new ResourceNotFoundException(
                messageSource.getMessage("resource.not-found-with-id", new Object[]{messageSource.getMessage("entity.event", null, locale), id}, locale));
        }
        eventRepository.deleteById(id);
    }

    private EventDto toDto(Event event) {
        var dto = new EventDto();
        dto.setId(event.getId());
        dto.setTitle(event.getTitle());
        dto.setDescription(event.getDescription());
        dto.setStartDate(event.getStartDate());
        dto.setEndDate(event.getEndDate());
        dto.setStartTime(event.getStartTime());
        dto.setEndTime(event.getEndTime());
        dto.setLocation(event.getLocation());
        dto.setAddress(event.getAddress());
        dto.setImageUrl(event.getImageUrl());
        dto.setCategory(event.getCategory());
        dto.setFeatured(event.getFeatured());
        dto.setActive(event.getActive());
        dto.setCreatedAt(event.getCreatedAt());
        dto.setUpdatedAt(event.getUpdatedAt());
        return dto;
    }

    private Event toEntity(EventDto dto) {
        return Event.builder()
                .title(dto.getTitle())
                .description(dto.getDescription())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .startTime(dto.getStartTime())
                .endTime(dto.getEndTime())
                .location(dto.getLocation())
                .address(dto.getAddress())
                .imageUrl(dto.getImageUrl())
                .category(dto.getCategory())
                .featured(dto.getFeatured() != null ? dto.getFeatured() : false)
                .active(dto.getActive() != null ? dto.getActive() : true)
                .build();
    }
}
