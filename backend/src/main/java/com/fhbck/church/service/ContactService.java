package com.fhbck.church.service;

import com.fhbck.church.dto.ContactMessageDto;
import com.fhbck.church.dto.PagedResponse;
import com.fhbck.church.entity.ContactMessage;
import com.fhbck.church.repository.ContactMessageRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.PageRequest;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service
@Slf4j
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;
    private final MessageSource messageSource;
    private JavaMailSender mailSender;

    @Value("${spring.mail.notify-to:}")
    private String notifyTo;

    @Value("${spring.mail.username:}")
    private String mailUsername;

    public ContactService(ContactMessageRepository contactMessageRepository, MessageSource messageSource) {
        this.contactMessageRepository = contactMessageRepository;
        this.messageSource = messageSource;
    }

    @Autowired(required = false)
    public void setMailSender(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

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
        var saved = toDto(contactMessageRepository.save(msg));
        sendNotificationEmail(saved);
        return saved;
    }

    private void sendNotificationEmail(ContactMessageDto msg) {
        if (mailSender == null || notifyTo == null || notifyTo.isEmpty() || mailUsername == null || mailUsername.isEmpty()) {
            log.info("Mail not configured — skipping notification for message #{} from {}", msg.getId(), msg.getEmail());
            return;
        }
        try {
            var locale = LocaleContextHolder.getLocale();
            var phone = msg.getPhone() != null ? msg.getPhone() : "N/A";
            var email = new SimpleMailMessage();
            email.setFrom(mailUsername);
            email.setTo(notifyTo);
            email.setSubject(messageSource.getMessage("contact.email-subject",
                    new Object[]{msg.getName(), msg.getSubject()}, locale));
            email.setText(messageSource.getMessage("contact.email-body",
                    new Object[]{msg.getName(), msg.getEmail(), phone, msg.getSubject(), msg.getMessage()}, locale));
            mailSender.send(email);
            log.info("Notification email sent for message #{}", msg.getId());
        } catch (Exception e) {
            log.warn("Failed to send notification email for message #{}: {}", msg.getId(), e.getMessage());
        }
    }

    @Transactional
    public ContactMessageDto markAsRead(Long id) {
        var locale = LocaleContextHolder.getLocale();
        var msg = contactMessageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        messageSource.getMessage("contact.message-not-found", new Object[]{id}, locale)));
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
