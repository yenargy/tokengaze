import { formatCurrency } from "@coingecko/cryptoformat";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseChartData(data: [number, number][]) {
  return data.map(([timestamp, price]) => ({
    date: new Date(timestamp).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }),
    price: price
  }));
}
