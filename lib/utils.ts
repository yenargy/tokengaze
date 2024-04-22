import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertDataToChartFormat(data: [number, number][]) {
  const maxElements = 40;
  const step = Math.ceil(data.length / maxElements);
  return data.filter((_, index) => index % step === 0).map(([timestamp, price]) => ({
    time: new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
    price: price
  }));
}