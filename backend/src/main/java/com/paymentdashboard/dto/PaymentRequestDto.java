package com.paymentdashboard.dto;

import com.paymentdashboard.model.enums.Currency;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class PaymentRequestDto {

    @NotNull(message = "El monto es obligatorio")
    @Positive(message = "El monto debe ser mayor que cero")
    private BigDecimal amount;

    @NotNull(message = "La moneda es obligatoria")
    private Currency currency;

    @NotBlank(message = "El número de tarjeta es obligatorio")
    @Pattern(regexp = "^[0-9]{13,19}$",
        message = "El número de tarjeta debe contener entre 13 y 19 dígitos")
    private String cardNumber;

    @NotBlank(message = "El titular de la tarjeta es obligatorio")
    @Size(max = 100, message = "El nombre del titular no puede exceder 100 caracteres")
    private String cardHolder;
}
