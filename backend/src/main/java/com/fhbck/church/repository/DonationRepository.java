package com.fhbck.church.repository;

import com.fhbck.church.entity.Donation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {
    Optional<Donation> findByPaymentIntentId(String paymentIntentId);
    boolean existsByPaymentIntentId(String paymentIntentId);
}
