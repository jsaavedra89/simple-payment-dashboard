import { useEffect, useState } from "react";
import { getPayments } from "../services/paymentService";
import type { PaymentResponse } from "../types/payment";

interface Props {
  refreshTrigger: number;
}

export default function TransactionHistory({ refreshTrigger }: Props) {
  const [transactions, setTransactions] = useState<PaymentResponse[]>([]);
  const [highlightedId, setHighlightedId] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentRecords = transactions.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const totalPages = Math.ceil(transactions.length / recordsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPayments();
      setTransactions(data);
      setCurrentPage(1); //vuelve a página 1 cuando se refresca

      if (data.length > 0) {
        setHighlightedId(data[0].id);

        setTimeout(() => {
          setHighlightedId(null);
        }, 2000);
      }
    };

    fetchData();
  }, [refreshTrigger]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const formattedDate = new Intl.DateTimeFormat("es-CL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);

    const formattedTime = new Intl.DateTimeFormat("es-CL", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);

    return `${formattedDate} - ${formattedTime}`;
  };

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency,
      minimumFractionDigits: currency === "CLP" ? 0 : 2,
      maximumFractionDigits: currency === "CLP" ? 0 : 2,
    }).format(amount);
  };

  return (
    <div>
      <table className="w-full border-collapse">
        <thead>
        <tr className="text-left border-b">
          <th className="py-2">ID</th>
          <th>Fecha</th>
          <th>Monto</th>
          <th>Estado</th>
        </tr>
        </thead>
        <tbody>
        {currentRecords.map((t) => (
          <tr
            key={t.id}
            className={`border-b border-gray-100 hover:bg-gray-50 transition-all duration-300 ${
              highlightedId === t.id ? "animate-fadeIn bg-green-50" : ""
            }`}
          >
            <td className="py-2 font-semibold text-gray-700">
              #{t.id}
            </td>
            <td className="text-sm text-gray-600">
              {formatDate(t.createdAt)}
            </td>
            <td className="font-medium">
              {formatAmount(t.amount, t.currency)}
            </td>
            <td>
                <span
                  className={`px-2 py-1 rounded text-sm font-medium ${
                    t.status === "APROBADO"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {t.status}
                </span>
            </td>
          </tr>
        ))}
        </tbody>
      </table>

      {/* Paginador */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.max(prev - 1, 1))
          }
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Anterior
        </button>

        <span className="text-sm text-gray-600">
          Página {currentPage} de {totalPages || 1}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, totalPages)
            )
          }
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
