export default function QuantitySelector({
  value,
  onChange,
  max,
  disabled,
}: {
  value: number;
  onChange: (qty: number) => void;
  max: number;
  disabled: boolean;
}) {
  const buttonClass =
    "rounded-md bg-gray-200 px-3 py-1 text-sm font-medium transition-colors hover:bg-gray-300 active:bg-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="mt-4 flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        disabled={disabled || value <= 1}
        className={buttonClass}
      >
        −
      </button>
      <span className="w-8 text-center text-sm">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={disabled || value >= max}
        className={buttonClass}
      >
        +
      </button>
    </div>
  );
}
