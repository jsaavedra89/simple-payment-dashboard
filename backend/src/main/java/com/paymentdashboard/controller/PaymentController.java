package com.paymentdashboard.controller;

import com.paymentdashboard.dto.PaymentRequestDto;
import com.paymentdashboard.dto.PaymentResponseDto;
import com.paymentdashboard.service.TransactionService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/payments")
public class PaymentController {

    private final TransactionService transactionService;

    //POST - Procesar pago
    @PostMapping
    public ResponseEntity<PaymentResponseDto> processPayment(
        @Valid @RequestBody PaymentRequestDto request) {

        PaymentResponseDto response =
            transactionService.processPayment(request);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(response);
    }

    //GET - Listar historial
    @GetMapping
    public ResponseEntity<List<PaymentResponseDto>> getAllPayments() {

        return ResponseEntity.ok(transactionService.getAllPayments());
    }
}
