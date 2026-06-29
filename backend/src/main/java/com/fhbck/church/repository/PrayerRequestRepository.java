package com.fhbck.church.repository;

import com.fhbck.church.entity.PrayerRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrayerRequestRepository extends JpaRepository<PrayerRequest, Long> {
    Page<PrayerRequest> findAllByOrderByCreatedAtDesc(Pageable pageable);
    List<PrayerRequest> findByIsPublicTrueAndPrayedFalseOrderByCreatedAtDesc();
    long countByPrayedFalse();
}
