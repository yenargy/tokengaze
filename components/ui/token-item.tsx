import type * as React from "react"

interface TokenItemProps {
  label: string
  value: number | string
}
  
const TokenItem: React.FC<TokenItemProps> = ({ label, value}) => {
  return (
    <div className="flex w-full justify-between items-center">
      <p className="text-[10px] md:text-xs font-light opacity-50">{label}</p>
      <p className="text-xs font-normal opacity-80">{value}</p>
    </div>
  );
};

export default TokenItem