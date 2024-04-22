import { TrendingUp, TrendingDown } from "lucide-react";

interface PriceChangeProps {
  value: number
}
  
export const PriceChangeIndicator: React.FC<PriceChangeProps> = ({ value }) => {
  return (
    <div className={`text-xs flex space-x-1 ${value < 0 ? 'text-red-500' : 'text-green-500'}`}>
      {value < 0 ? <TrendingDown size={16}/> : <TrendingUp size={16}/>}
      <span>{value.toFixed(2)}%</span>
    </div>
  );
};