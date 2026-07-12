package com.fhbck.church.service;

import com.fhbck.church.dto.*;
import com.fhbck.church.entity.Role;
import com.fhbck.church.entity.User;
import com.fhbck.church.exception.ResourceNotFoundException;
import com.fhbck.church.repository.RoleRepository;
import com.fhbck.church.repository.UserRepository;
import com.fhbck.church.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final MessageSource messageSource;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        var locale = LocaleContextHolder.getLocale();
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException(
                    messageSource.getMessage("auth.email-already-registered", null, locale));
        }

        var userRole = roleRepository.findByName("EDITOR")
                .orElseThrow(() -> new RuntimeException(
                        messageSource.getMessage("auth.default-role-not-found", null, locale)));

        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(Set.of(userRole))
                .build();

        user = userRepository.save(user);
        return buildAuthResponse(user);
    }

    public AuthResponse login(LoginRequest request) {
        var locale = LocaleContextHolder.getLocale();

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException(
                        messageSource.getMessage("auth.invalid-credentials", null, locale)));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException(
                    messageSource.getMessage("auth.invalid-credentials", null, locale));
        }

        if (!user.isEnabled()) {
            throw new BadCredentialsException(
                    messageSource.getMessage("auth.account-disabled", null, locale));
        }

        return buildAuthResponse(user);
    }

    public AuthResponse refresh(String refreshToken) {
        var locale = LocaleContextHolder.getLocale();

        if (!jwtTokenProvider.isRefreshToken(refreshToken) || !jwtTokenProvider.validateToken(refreshToken)) {
            throw new IllegalArgumentException(
                    messageSource.getMessage("auth.invalid-refresh-token", null, locale));
        }

        String email = jwtTokenProvider.getEmailFromToken(refreshToken);
        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException(
                        messageSource.getMessage("auth.user-not-found", null, locale)));

        return buildAuthResponse(user);
    }

    private AuthResponse buildAuthResponse(User user) {
        String role = user.getRoles().stream()
                .findFirst()
                .map(r -> r.getName())
                .orElse("EDITOR");

        String accessToken = jwtTokenProvider.generateAccessToken(user.getEmail(), role);
        String refreshToken = jwtTokenProvider.generateRefreshToken(user.getEmail());

        var userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setEmail(user.getEmail());
        userDto.setEnabled(user.isEnabled());
        userDto.setRoles(user.getRoles().stream().map(Role::getName).collect(Collectors.toSet()));

        return new AuthResponse(accessToken, refreshToken, userDto);
    }
}
