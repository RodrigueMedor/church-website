package com.fhbck.church.service;

import com.fhbck.church.dto.LeaderDto;
import com.fhbck.church.entity.Leader;
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
public class LeaderService {

    private final LeaderRepository leaderRepository;
    private final MinistryRepository ministryRepository;

    public List<LeaderDto> getByMinistry(Long ministryId) {
        return leaderRepository.findByMinistryIdAndActiveTrueOrderBySortOrderAsc(ministryId)
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<LeaderDto> getAll() {
        return leaderRepository.findByActiveTrueOrderBySortOrderAsc()
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    @Transactional
    public LeaderDto create(LeaderDto dto) {
        var leader = new Leader();
        leader.setName(dto.getName());
        leader.setTitle(dto.getTitle());
        leader.setImageUrl(dto.getImageUrl());
        leader.setBio(dto.getBio());
        leader.setSortOrder(dto.getSortOrder() != null ? dto.getSortOrder() : 0);
        leader.setActive(dto.getActive() != null ? dto.getActive() : true);

        if (dto.getMinistryId() != null) {
            var ministry = ministryRepository.findById(dto.getMinistryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Ministry not found"));
            leader.setMinistry(ministry);
        }

        return toDto(leaderRepository.save(leader));
    }

    @Transactional
    public LeaderDto update(Long id, LeaderDto dto) {
        var leader = leaderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Leader not found: " + id));
        leader.setName(dto.getName());
        leader.setTitle(dto.getTitle());
        leader.setImageUrl(dto.getImageUrl());
        leader.setBio(dto.getBio());
        leader.setSortOrder(dto.getSortOrder());
        leader.setActive(dto.getActive());

        if (dto.getMinistryId() != null) {
            var ministry = ministryRepository.findById(dto.getMinistryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Ministry not found"));
            leader.setMinistry(ministry);
        }

        return toDto(leaderRepository.save(leader));
    }

    @Transactional
    public void delete(Long id) {
        if (!leaderRepository.existsById(id)) {
            throw new ResourceNotFoundException("Leader not found: " + id);
        }
        leaderRepository.deleteById(id);
    }

    private LeaderDto toDto(Leader l) {
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
}
