package com.paymentdashboard.model.enums;

public enum TransactionStatus {

    APROBADO("Pago Aprobado"),
    RECHAZADO("Pago Rechazado");

    private final String label;

    TransactionStatus(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
