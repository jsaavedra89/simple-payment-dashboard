import type { CreatePaymentRequest } from "../types/payment";

export const validatePayment = (
  data: CreatePaymentRequest
): string | null => {

  if (Number.isNaN(data.amount) || data.amount <= 0) {
    return "El monto debe ser mayor a 0";
  }

  if (!data.currency.trim()) {
    return "La moneda es obligatoria";
  }

  if (!data.cardNumber.trim()) {
    return "El número de tarjeta es obligatorio";
  }

  if (!/^\d+$/.test(data.cardNumber)) {
    return "El número de tarjeta debe contener solo números";
  }

  if (data.cardNumber.length < 13 || data.cardNumber.length > 19) {
    return "El número de tarjeta debe tener entre 13 y 19 dígitos";
  }

  if (!data.cardHolder.trim()) {
    return "El nombre del titular es obligatorio";
  }

  return null;
};
