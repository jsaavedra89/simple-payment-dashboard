import { useState } from "react";
import PaymentForm from "../components/PaymentForm";
import TransactionHistory from "../components/TransactionHistory";

export default function PaymentPage() {

  //Aquí se gatilla la función
  const [refreshCounter, setRefreshCounter] = useState(0);

  //Esta función se llamará cuando la transacción se cree
  const handlePaymentSuccess = () => {
    setRefreshCounter(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Virtual POS */}
        <div className="lg:col-span-1 bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
          <h2 className="text-2xl font-semibold mb-6">
            Virtual POS
          </h2>

          {/* Le pasamos la función al formulario para actualizar tabla de transacciones */}
          <PaymentForm onSuccess={handlePaymentSuccess} />
        </div>

        <div className="lg:col-span-2 bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
          <h2 className="text-2xl font-semibold mb-6">
            Historial de Transacciones
          </h2>

          {/* Historial de transacciones */}
          <TransactionHistory refreshTrigger={refreshCounter} />
        </div>

      </div>
    </div>
  );
}
