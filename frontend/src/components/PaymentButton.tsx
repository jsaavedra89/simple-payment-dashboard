interface Props {
  onClick: () => void;
  loading: boolean;
}

export default function PaymentButton({ onClick, loading }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-blue-300"
    >
      {loading ? "Procesando..." : "Pagar"}
    </button>
  );
}
