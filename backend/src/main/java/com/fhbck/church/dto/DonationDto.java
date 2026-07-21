package com.fhbck.church.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Email;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class DonationDto {
    @DecimalMin(value = "1.00", message = "Minimum donation is $1.00")
    @Digits(integer = 7, fraction = 2)
    private BigDecimal amount;

    private String currency = "usd";

    @Email
    private String donorEmail;

    private String donorName;

    private String description;
}
