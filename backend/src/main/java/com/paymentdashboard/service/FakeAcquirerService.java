package com.paymentdashboard.service;

import com.paymentdashboard.model.enums.TransactionStatus;
import org.springframework.stereotype.Service;

@Service
public class FakeAcquirerService {

    public TransactionStatus authorize(String cardNumber) {

        int lastDigit = Character.getNumericValue(
            cardNumber.charAt(cardNumber.length() - 1)
        );

        return (lastDigit % 2 == 0)
            ? TransactionStatus.APROBADO
            : TransactionStatus.RECHAZADO;
    }
}
