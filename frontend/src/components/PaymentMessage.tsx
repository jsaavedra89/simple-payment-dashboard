interface Props {
  message: string | null;
  isSuccess: boolean;
}

export default function PaymentMessage({ message, isSuccess }: Props) {
  if (!message) return null;

  return (
    <div
      className={`
        mt-3 text-sm font-medium px-3 py-2 rounded-lg border
        transition-all duration-300 ease-out
        animate-fadeIn
        ${
        isSuccess
          ? "bg-green-50 text-green-700 border-green-200"
          : "bg-red-50 text-red-700 border-red-200"
      }
      `}
    >
      {message}
    </div>
  );
}
