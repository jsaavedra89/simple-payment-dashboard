package com.paymentdashboard.dto;

import com.paymentdashboard.model.enums.Currency;
import com.paymentdashboard.model.enums.TransactionStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class PaymentResponseDto {

    private Long id;
    private BigDecimal amount;
    private Currency currency;
    private TransactionStatus status;
    private String message;
    private LocalDateTime createdAt;
}
