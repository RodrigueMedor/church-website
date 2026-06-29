package com.fhbck.church.service;

import com.fhbck.church.dto.PagedResponse;
import com.fhbck.church.dto.PrayerRequestDto;
import com.fhbck.church.entity.PrayerRequest;
import com.fhbck.church.repository.PrayerRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PrayerService {

    private final PrayerRequestRepository prayerRequestRepository;

    public PagedResponse<PrayerRequestDto> getAll(int page, int size) {
        var pageable = PageRequest.of(page, size);
        var result = prayerRequestRepository.findAllByOrderByCreatedAtDesc(pageable);
        var items = result.getContent().stream().map(this::toDto).collect(Collectors.toList());
        return new PagedResponse<>(items, result.getNumber(), result.getSize(),
                result.getTotalElements(), result.getTotalPages(),
                result.isLast(), result.isFirst());
    }

    public List<PrayerRequestDto> getPublic() {
        return prayerRequestRepository.findByIsPublicTrueAndPrayedFalseOrderByCreatedAtDesc()
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    public long getUnprayedCount() {
        return prayerRequestRepository.countByPrayedFalse();
    }

    @Transactional
    public PrayerRequestDto create(PrayerRequestDto dto) {
        var req = PrayerRequest.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .request(dto.getRequest())
                .isPublic(dto.getIsPublic() != null && dto.getIsPublic())
                .build();
        return toDto(prayerRequestRepository.save(req));
    }

    @Transactional
    public PrayerRequestDto markAsPrayed(Long id) {
        var req = prayerRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prayer request not found: " + id));
        req.setPrayed(true);
        return toDto(prayerRequestRepository.save(req));
    }

    @Transactional
    public void delete(Long id) {
        prayerRequestRepository.deleteById(id);
    }

    private PrayerRequestDto toDto(PrayerRequest p) {
        var dto = new PrayerRequestDto();
        dto.setId(p.getId());
        dto.setName(p.getName());
        dto.setEmail(p.getEmail());
        dto.setRequest(p.getRequest());
        dto.setIsPublic(p.getIsPublic());
        dto.setPrayed(p.getPrayed());
        dto.setCreatedAt(p.getCreatedAt());
        dto.setUpdatedAt(p.getUpdatedAt());
        return dto;
    }
}
