package com.fhbck.church.service;

import com.fhbck.church.dto.LeaderDto;
import com.fhbck.church.dto.MinistryDto;
import com.fhbck.church.entity.Ministry;
import com.fhbck.church.exception.ResourceNotFoundException;
import com.fhbck.church.repository.LeaderRepository;
import com.fhbck.church.repository.MinistryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MinistryService {

    private final MinistryRepository ministryRepository;
    private final LeaderRepository leaderRepository;

    public List<MinistryDto> getAll() {
        return ministryRepository.findByActiveTrueOrderBySortOrderAsc()
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    public MinistryDto getBySlug(String slug) {
        var ministry = ministryRepository.findBySlugAndActiveTrue(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Ministry not found: " + slug));
        return toDto(ministry);
    }

    public MinistryDto getById(Long id) {
        return toDto(ministryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ministry not found: " + id)));
    }

    @Transactional
    public MinistryDto create(MinistryDto dto) {
        var ministry = toEntity(dto);
        return toDto(ministryRepository.save(ministry));
    }

    @Transactional
    public MinistryDto update(Long id, MinistryDto dto) {
        var ministry = ministryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ministry not found: " + id));
        ministry.setName(dto.getName());
        ministry.setTagline(dto.getTagline());
        ministry.setDescription(dto.getDescription());
        ministry.setLongDescription(dto.getLongDescription());
        ministry.setImageUrl(dto.getImageUrl());
        ministry.setHeroImagePosition(dto.getHeroImagePosition());
        ministry.setMeetingTime(dto.getMeetingTime());
        ministry.setMeetingLocation(dto.getMeetingLocation());
        ministry.setContactEmail(dto.getContactEmail());
        ministry.setSortOrder(dto.getSortOrder());
        ministry.setActive(dto.getActive());
        ministry.setSlug(dto.getSlug());
        return toDto(ministryRepository.save(ministry));
    }

    @Transactional
    public void delete(Long id) {
        if (!ministryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Ministry not found: " + id);
        }
        ministryRepository.deleteById(id);
    }

    private MinistryDto toDto(Ministry m) {
        var dto = new MinistryDto();
        dto.setId(m.getId());
        dto.setName(m.getName());
        dto.setTagline(m.getTagline());
        dto.setDescription(m.getDescription());
        dto.setLongDescription(m.getLongDescription());
        dto.setImageUrl(m.getImageUrl());
        dto.setHeroImagePosition(m.getHeroImagePosition());
        dto.setMeetingTime(m.getMeetingTime());
        dto.setMeetingLocation(m.getMeetingLocation());
        dto.setContactEmail(m.getContactEmail());
        dto.setSortOrder(m.getSortOrder());
        dto.setActive(m.getActive());
        dto.setSlug(m.getSlug());
        dto.setCreatedAt(m.getCreatedAt());
        dto.setUpdatedAt(m.getUpdatedAt());

        var leaders = leaderRepository.findByMinistryIdAndActiveTrueOrderBySortOrderAsc(m.getId())
                .stream().map(this::toLeaderDto).collect(Collectors.toList());
        dto.setLeaders(leaders);

        return dto;
    }

    private LeaderDto toLeaderDto(com.fhbck.church.entity.Leader l) {
        var dto = new LeaderDto();
        dto.setId(l.getId());
        dto.setName(l.getName());
        dto.setTitle(l.getTitle());
        dto.setImageUrl(l.getImageUrl());
        dto.setBio(l.getBio());
        dto.setSortOrder(l.getSortOrder());
        dto.setActive(l.getActive());
        dto.setMinistryId(l.getMinistry() != null ? l.getMinistry().getId() : null);
        dto.setCreatedAt(l.getCreatedAt());
        dto.setUpdatedAt(l.getUpdatedAt());
        return dto;
    }

    private Ministry toEntity(MinistryDto dto) {
        return Ministry.builder()
                .name(dto.getName())
                .tagline(dto.getTagline())
                .description(dto.getDescription())
                .longDescription(dto.getLongDescription())
                .imageUrl(dto.getImageUrl())
                .heroImagePosition(dto.getHeroImagePosition())
                .meetingTime(dto.getMeetingTime())
                .meetingLocation(dto.getMeetingLocation())
                .contactEmail(dto.getContactEmail())
                .sortOrder(dto.getSortOrder() != null ? dto.getSortOrder() : 0)
                .active(dto.getActive() != null ? dto.getActive() : true)
                .slug(dto.getSlug())
                .build();
    }
}
