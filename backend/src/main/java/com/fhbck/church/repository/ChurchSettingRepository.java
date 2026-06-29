package com.fhbck.church.repository;

import com.fhbck.church.entity.ChurchSetting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChurchSettingRepository extends JpaRepository<ChurchSetting, Long> {
    Optional<ChurchSetting> findBySettingKey(String key);
}
