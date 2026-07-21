package com.fhbck.church.controller;

import com.fhbck.church.dto.DonationDto;
import com.fhbck.church.dto.PaymentIntentDto;
import com.fhbck.church.service.DonationService;
import com.stripe.exception.StripeException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/public/donations")
@RequiredArgsConstructor
@Tag(name = "Donations", description = "Public donation endpoints (Stripe integration)")
public class DonationController {

    private final DonationService donationService;

    @PostMapping("/create-payment-intent")
    @Operation(summary = "Create a Stripe PaymentIntent for a donation")
    public ResponseEntity<?> createPaymentIntent(@Valid @RequestBody DonationDto dto) {
        try {
            PaymentIntentDto result = donationService.createPaymentIntent(dto);
            return ResponseEntity.ok(result);
        } catch (StripeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "Failed to create payment. Please try again.",
                    "details", e.getMessage()
            ));
        }
    }

    @PostMapping("/confirm/{paymentIntentId}")
    @Operation(summary = "Confirm and record a completed donation")
    public ResponseEntity<?> confirmDonation(@PathVariable String paymentIntentId) {
        try {
            var donation = donationService.confirmDonation(paymentIntentId);
            return ResponseEntity.ok(Map.of(
                    "id", donation.getId(),
                    "status", donation.getStatus(),
                    "amount", donation.getAmount(),
                    "message", "Thank you for your generous donation!"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "Failed to confirm donation",
                    "details", e.getMessage()
            ));
        }
    }

    @GetMapping("/status/{paymentIntentId}")
    @Operation(summary = "Check donation payment status")
    public ResponseEntity<?> getDonationStatus(@PathVariable String paymentIntentId) {
        try {
            return ResponseEntity.ok(donationService.getDonationStatus(paymentIntentId));
        } catch (StripeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "Failed to retrieve status",
                    "details", e.getMessage()
            ));
        }
    }
}
