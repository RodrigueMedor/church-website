package com.fhbck.church.service;

import com.fhbck.church.dto.ContactMessageDto;
import com.fhbck.church.dto.PagedResponse;
import com.fhbck.church.entity.ContactMessage;
import com.fhbck.church.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;

    public PagedResponse<ContactMessageDto> getAll(int page, int size) {
        var pageable = PageRequest.of(page, size);
        var result = contactMessageRepository.findAllByOrderByCreatedAtDesc(pageable);
        var items = result.getContent().stream().map(this::toDto).collect(Collectors.toList());
        return new PagedResponse<>(items, result.getNumber(), result.getSize(),
                result.getTotalElements(), result.getTotalPages(),
                result.isLast(), result.isFirst());
    }

    public long getUnreadCount() {
        return contactMessageRepository.countByReadFalse();
    }

    @Transactional
    public ContactMessageDto create(ContactMessageDto dto) {
        var msg = ContactMessage.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .subject(dto.getSubject())
                .message(dto.getMessage())
                .build();
        return toDto(contactMessageRepository.save(msg));
    }

    @Transactional
    public ContactMessageDto markAsRead(Long id) {
        var msg = contactMessageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Message not found: " + id));
        msg.setRead(true);
        return toDto(contactMessageRepository.save(msg));
    }

    @Transactional
    public void delete(Long id) {
        contactMessageRepository.deleteById(id);
    }

    private ContactMessageDto toDto(ContactMessage m) {
        var dto = new ContactMessageDto();
        dto.setId(m.getId());
        dto.setName(m.getName());
        dto.setEmail(m.getEmail());
        dto.setPhone(m.getPhone());
        dto.setSubject(m.getSubject());
        dto.setMessage(m.getMessage());
        dto.setRead(m.getRead());
        dto.setCreatedAt(m.getCreatedAt());
        dto.setUpdatedAt(m.getUpdatedAt());
        return dto;
    }
}
