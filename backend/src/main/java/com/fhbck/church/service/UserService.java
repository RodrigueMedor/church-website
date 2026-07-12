package com.fhbck.church.service;

import com.fhbck.church.dto.RegisterRequest;
import com.fhbck.church.dto.UserDto;
import com.fhbck.church.entity.Role;
import com.fhbck.church.entity.User;
import com.fhbck.church.exception.ResourceNotFoundException;
import com.fhbck.church.repository.RoleRepository;
import com.fhbck.church.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final MessageSource messageSource;

    public List<UserDto> getAll() {
        return userRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    public UserDto getById(Long id) {
        return toDto(userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("resource.not-found-with-id", new Object[]{messageSource.getMessage("entity.user", null, LocaleContextHolder.getLocale()), id}, LocaleContextHolder.getLocale()))));
    }

    @Transactional
    public UserDto create(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException(
                    messageSource.getMessage("user.email-already-registered", null, LocaleContextHolder.getLocale()));
        }
        var editorRole = roleRepository.findByName("EDITOR")
                .orElseThrow(() -> new RuntimeException(messageSource.getMessage("auth.default-role-not-found", null, LocaleContextHolder.getLocale())));
        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(Set.of(editorRole))
                .build();
        return toDto(userRepository.save(user));
    }

    @Transactional
    public UserDto update(Long id, RegisterRequest request) {
        var user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("resource.not-found-with-id", new Object[]{messageSource.getMessage("entity.user", null, LocaleContextHolder.getLocale()), id}, LocaleContextHolder.getLocale())));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        return toDto(userRepository.save(user));
    }

    @Transactional
    public UserDto updateRoles(Long id, List<String> roleNames) {
        var user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(messageSource.getMessage("resource.not-found-with-id", new Object[]{messageSource.getMessage("entity.user", null, LocaleContextHolder.getLocale()), id}, LocaleContextHolder.getLocale())));
        var roles = new HashSet<Role>();
        for (var name : roleNames) {
            var role = roleRepository.findByName(name)
                    .orElseThrow(() -> new IllegalArgumentException(messageSource.getMessage("resource.not-found-with-id", new Object[]{messageSource.getMessage("entity.role", null, LocaleContextHolder.getLocale()), name}, LocaleContextHolder.getLocale())));
            roles.add(role);
        }
        user.setRoles(roles);
        return toDto(userRepository.save(user));
    }

    @Transactional
    public void delete(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    messageSource.getMessage("resource.not-found-with-id", new Object[]{messageSource.getMessage("entity.user", null, LocaleContextHolder.getLocale()), id}, LocaleContextHolder.getLocale()));
        }
        userRepository.deleteById(id);
    }

    private UserDto toDto(User user) {
        var dto = new UserDto();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setEnabled(user.isEnabled());
        dto.setRoles(user.getRoles().stream().map(Role::getName).collect(Collectors.toSet()));
        return dto;
    }
}
