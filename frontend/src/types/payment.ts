export interface CreatePaymentRequest {
  amount: number;
  currency: string;
  cardNumber: string;
  cardHolder: string;
}

export interface PaymentResponse {
  id: number;
  amount: number;
  currency: string;
  status: string;
  statusLabel: string;
  createdAt: string;
}
