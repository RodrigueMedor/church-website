package com.fhbck.church.service;

import com.fhbck.church.dto.PastorDto;
import com.fhbck.church.entity.Pastor;
import com.fhbck.church.exception.ResourceNotFoundException;
import com.fhbck.church.repository.PastorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PastorService {

    private final PastorRepository pastorRepository;
    private final MessageSource messageSource;

    public List<PastorDto> getAll() {
        return pastorRepository.findAllByOrderByCreatedAtAsc()
                .stream().map(this::toDto).collect(Collectors.toList());
    }

    public PastorDto getById(Long id) {
        var locale = LocaleContextHolder.getLocale();
        return toDto(pastorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        messageSource.getMessage("resource.not-found-with-id", new Object[]{messageSource.getMessage("entity.pastor", null, locale), id}, locale))));
    }

    @Transactional
    public PastorDto create(PastorDto dto) {
        var pastor = toEntity(dto);
        return toDto(pastorRepository.save(pastor));
    }

    @Transactional
    public PastorDto update(Long id, PastorDto dto) {
        var locale = LocaleContextHolder.getLocale();
        var pastor = pastorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        messageSource.getMessage("resource.not-found-with-id", new Object[]{messageSource.getMessage("entity.pastor", null, locale), id}, locale)));
        pastor.setName(dto.getName());
        pastor.setTitle(dto.getTitle());
        pastor.setImageUrl(dto.getImageUrl());
        pastor.setBio(dto.getBio());
        pastor.setMessage(dto.getMessage());
        pastor.setEmail(dto.getEmail());
        return toDto(pastorRepository.save(pastor));
    }

    @Transactional
    public void delete(Long id) {
        if (!pastorRepository.existsById(id)) {
            var locale = LocaleContextHolder.getLocale();
            throw new ResourceNotFoundException(
                    messageSource.getMessage("resource.not-found-with-id", new Object[]{messageSource.getMessage("entity.pastor", null, locale), id}, locale));
        }
        pastorRepository.deleteById(id);
    }

    private PastorDto toDto(Pastor p) {
        var dto = new PastorDto();
        dto.setId(p.getId());
        dto.setName(p.getName());
        dto.setTitle(p.getTitle());
        dto.setImageUrl(p.getImageUrl());
        dto.setBio(p.getBio());
        dto.setMessage(p.getMessage());
        dto.setEmail(p.getEmail());
        dto.setCreatedAt(p.getCreatedAt());
        dto.setUpdatedAt(p.getUpdatedAt());
        return dto;
    }

    private Pastor toEntity(PastorDto dto) {
        return Pastor.builder()
                .name(dto.getName())
                .title(dto.getTitle())
                .imageUrl(dto.getImageUrl())
                .bio(dto.getBio())
                .message(dto.getMessage())
                .email(dto.getEmail())
                .build();
    }
}
