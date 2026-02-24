package com.paymentdashboard.service;

import com.paymentdashboard.dto.PaymentRequestDto;
import com.paymentdashboard.dto.PaymentResponseDto;
import com.paymentdashboard.model.Transaction;
import com.paymentdashboard.model.enums.TransactionStatus;
import com.paymentdashboard.repository.TransactionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final FakeAcquirerService fakeAcquirerService;

    @Transactional
    public PaymentResponseDto processPayment(PaymentRequestDto request) {

        //Obtener estado desde FakeAcquirer
        TransactionStatus status =
            fakeAcquirerService.authorize(request.getCardNumber());

        //Crear entidad
        Transaction transaction = new Transaction();
        transaction.setAmount(request.getAmount());
        transaction.setCurrency(request.getCurrency());
        transaction.setCardNumber(request.getCardNumber());
        transaction.setCardHolder(request.getCardHolder());
        transaction.setStatus(status);

        // createdAt se asigna automáticamente con @PrePersist

        //Guardar en base de datos
        Transaction savedTransaction = transactionRepository.save(transaction);

        return new PaymentResponseDto(
            savedTransaction.getId(),
            savedTransaction.getAmount(),
            savedTransaction.getCurrency(),
            savedTransaction.getStatus(),
            savedTransaction.getStatus().getLabel(),
            savedTransaction.getCreatedAt()
        );
    }

    @Transactional(readOnly = true)
    public List<PaymentResponseDto> getAllPayments() {

        return transactionRepository
            .findAllByOrderByCreatedAtDesc()
            .stream()
            .map(transaction -> new PaymentResponseDto(
                transaction.getId(),
                transaction.getAmount(),
                transaction.getCurrency(),
                transaction.getStatus(),
                transaction.getStatus().getLabel(),
                transaction.getCreatedAt()
            ))
            .toList();
    }
}
