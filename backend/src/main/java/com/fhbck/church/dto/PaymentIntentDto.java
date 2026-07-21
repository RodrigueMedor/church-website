package com.fhbck.church.dto;

import lombok.Data;

@Data
public class PaymentIntentDto {
    private String clientSecret;
    private String paymentIntentId;
    private String amount;
    private String currency;
}
