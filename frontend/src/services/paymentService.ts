import type { CreatePaymentRequest, PaymentResponse } from "../types/payment";

const API_URL = import.meta.env.VITE_API_URL;

//Crea la transacción
export const createPayment = async (
  request: CreatePaymentRequest
): Promise<PaymentResponse> => {

  const response = await fetch(`${API_URL}/api/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Error en el pago");
  }

  return response.json();
};

//Lista el historal de transacciones
export const getPayments = async (): Promise<PaymentResponse[]> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payments`);

  if (!response.ok) {
    throw new Error("Error obteniendo historial de transacciones");
  }

  return response.json();
};
