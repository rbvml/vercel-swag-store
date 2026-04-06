type Stock = {
  stock: number;
  inStock: boolean;
  lowStock: boolean;
};

function getStockStatus(inStock: boolean, lowStock: boolean, stock: number) {
  if (!inStock) return { label: "Out of stock", color: "text-red-500" };
  if (lowStock)
    return { label: `Low stock (${stock} left)`, color: "text-orange-500" };
  return { label: `In stock (${stock})`, color: "text-green-600" };
}

export default function StockIndicator({ inStock, lowStock, stock }: Stock) {
  const { label, color } = getStockStatus(inStock, lowStock, stock);
  return <p className={`mt-2 text-sm ${color}`}>{label}</p>;
}
