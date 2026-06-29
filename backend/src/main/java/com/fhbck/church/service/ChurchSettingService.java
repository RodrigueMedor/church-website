package com.fhbck.church.service;

import com.fhbck.church.dto.ChurchSettingDto;
import com.fhbck.church.entity.ChurchSetting;
import com.fhbck.church.exception.ResourceNotFoundException;
import com.fhbck.church.repository.ChurchSettingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChurchSettingService {

    private final ChurchSettingRepository churchSettingRepository;

    public List<ChurchSettingDto> getAll() {
        return churchSettingRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    public String getValue(String key) {
        return churchSettingRepository.findBySettingKey(key)
                .map(ChurchSetting::getSettingValue)
                .orElse(null);
    }

    public Map<String, String> getValuesByKeys(List<String> keys) {
        return keys.stream()
                .map(k -> churchSettingRepository.findBySettingKey(k).orElse(null))
                .filter(s -> s != null)
                .collect(Collectors.toMap(ChurchSetting::getSettingKey, ChurchSetting::getSettingValue));
    }

    @Transactional
    public ChurchSettingDto update(String key, String value) {
        var setting = churchSettingRepository.findBySettingKey(key)
                .orElseGet(() -> ChurchSetting.builder().settingKey(key).build());
        setting.setSettingValue(value);
        return toDto(churchSettingRepository.save(setting));
    }

    private ChurchSettingDto toDto(ChurchSetting s) {
        var dto = new ChurchSettingDto();
        dto.setId(s.getId());
        dto.setSettingKey(s.getSettingKey());
        dto.setSettingValue(s.getSettingValue());
        dto.setDescription(s.getDescription());
        dto.setCreatedAt(s.getCreatedAt());
        dto.setUpdatedAt(s.getUpdatedAt());
        return dto;
    }
}
