package com.fhbck.church.service;

import com.fhbck.church.dto.DonationDto;
import com.fhbck.church.dto.PaymentIntentDto;
import com.fhbck.church.entity.Donation;
import com.fhbck.church.repository.DonationRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Map;

@Service
@Slf4j
public class DonationService {

    private final DonationRepository donationRepository;

    @Value("${stripe.secret-key:}")
    private String stripeSecretKey;

    public DonationService(DonationRepository donationRepository) {
        this.donationRepository = donationRepository;
    }

    @PostConstruct
    public void init() {
        if (stripeSecretKey != null && !stripeSecretKey.isEmpty()) {
            Stripe.apiKey = stripeSecretKey;
            log.info("Stripe SDK initialized");
        } else {
            log.warn("Stripe secret key not configured — donations will not work");
        }
    }

    public PaymentIntentDto createPaymentIntent(DonationDto dto) throws StripeException {
        if (stripeSecretKey == null || stripeSecretKey.isEmpty()) {
            throw new RuntimeException("Stripe is not configured");
        }

        long amountInCents = dto.getAmount()
                .multiply(BigDecimal.valueOf(100))
                .longValue();

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amountInCents)
                .setCurrency(dto.getCurrency() != null ? dto.getCurrency() : "usd")
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                .setEnabled(true)
                                .build()
                )
                .putMetadata("donor_email", dto.getDonorEmail() != null ? dto.getDonorEmail() : "")
                .putMetadata("donor_name", dto.getDonorName() != null ? dto.getDonorName() : "")
                .putMetadata("description", dto.getDescription() != null ? dto.getDescription() : "Online Donation")
                .build();

        PaymentIntent paymentIntent = PaymentIntent.create(params);

        PaymentIntentDto result = new PaymentIntentDto();
        result.setClientSecret(paymentIntent.getClientSecret());
        result.setPaymentIntentId(paymentIntent.getId());
        result.setAmount(dto.getAmount().toPlainString());
        result.setCurrency(dto.getCurrency());

        log.info("PaymentIntent created: {} for ${}", paymentIntent.getId(), dto.getAmount());

        return result;
    }

    @Transactional
    public Donation confirmDonation(String paymentIntentId) {
        Donation existing = donationRepository.findByPaymentIntentId(paymentIntentId).orElse(null);
        if (existing != null) {
            return existing;
        }

        try {
            PaymentIntent pi = PaymentIntent.retrieve(paymentIntentId);

            Donation donation = Donation.builder()
                    .paymentIntentId(pi.getId())
                    .amount(BigDecimal.valueOf(pi.getAmount()).divide(BigDecimal.valueOf(100)))
                    .currency(pi.getCurrency())
                    .donorEmail(pi.getMetadata().getOrDefault("donor_email", ""))
                    .donorName(pi.getMetadata().getOrDefault("donor_name", ""))
                    .status(pi.getStatus())
                    .description(pi.getMetadata().getOrDefault("description", "Online Donation"))
                    .build();

            return donationRepository.save(donation);
        } catch (StripeException e) {
            log.error("Failed to confirm donation for PI {}: {}", paymentIntentId, e.getMessage());
            throw new RuntimeException("Failed to confirm donation");
        }
    }

    public Map<String, Object> getDonationStatus(String paymentIntentId) throws StripeException {
        PaymentIntent pi = PaymentIntent.retrieve(paymentIntentId);
        return Map.of(
                "status", pi.getStatus(),
                "amount", pi.getAmount(),
                "currency", pi.getCurrency()
        );
    }
}
