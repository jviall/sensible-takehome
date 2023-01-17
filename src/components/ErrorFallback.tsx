interface Props {
  error: Error;
  resetErrorBoundary: () => void;
  label?: string;
}

export default function ErrorFallback({
  error,
  resetErrorBoundary,
  label = "Error",
}: Props) {
  return (
    <div className="p-2 border-2 border-red-600 dark:border-red-400 rounded-md flex flex-col gap-2 items-center">
      <span className="text-red-500 font-semibold">{label}:</span>
      <pre className="whitespace-normal">{error.message}</pre>
      <button onClick={resetErrorBoundary} className="button">
        Retry
      </button>
    </div>
  );
}
