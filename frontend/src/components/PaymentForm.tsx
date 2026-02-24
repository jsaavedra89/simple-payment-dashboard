import { useState, useEffect } from "react";
import type { CreatePaymentRequest } from "../types/payment";
import { createPayment } from "../services/paymentService";
import { validatePayment } from "../validators/paymentValidator";
import PaymentButton from "./PaymentButton";
import PaymentMessage from "./PaymentMessage";

interface Props {
  onSuccess: () => void;
}

export default function PaymentForm({ onSuccess }: Props) {
  const [amount, setAmount] = useState<string>("");
  const [currency, setCurrency] = useState<string>("CLP");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardHolder, setCardHolder] = useState<string>("");

  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  //Función para resetear formulario
  const resetForm = () => {
    setAmount("");
    setCurrency("CLP");
    setCardNumber("");
    setCardHolder("");
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleCardHolderChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const sanitized = e.target.value
      .toUpperCase()
      .replace(/[^A-ZÁÉÍÓÚÑ ]/g, '');

    setCardHolder(sanitized);
  };

  const handlePay = async () => {

    const request: CreatePaymentRequest = {
      amount: Number(amount),
      currency,
      cardNumber,
      cardHolder,
    };

    const validationError = validatePayment(request);

    if (validationError) {
      setIsSuccess(false);
      setMessage(validationError);
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const data = await createPayment(request);

      if (data.status === "APROBADO") {
        setIsSuccess(true);
        setMessage("Pago Aprobado");
        resetForm();
        onSuccess();
      } else {
        setIsSuccess(false);
        setMessage("Pago Rechazado");
        onSuccess();
      }

    } catch (error) {
      setIsSuccess(false);
      setMessage("Error al procesar la transacción");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Monto
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Moneda
        </label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="CLP">CLP</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Número de tarjeta
        </label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre del titular
        </label>
        <input
          type="text"
          value={cardHolder}
          onChange={handleCardHolderChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <PaymentButton
        onClick={handlePay}
        loading={loading}
      />

      <PaymentMessage
        message={message}
        isSuccess={isSuccess}
      />
    </div>
  );
}
