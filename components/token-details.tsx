"use client"

import * as React from "react"
import { getUserBalance } from '@/lib/wallet-utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { ChevronUp } from "lucide-react";

interface TokenDetailsProps {
  id: string;
}

interface TokenData {
  ath: number,
  market_cap: number,
  name: string,
  price_change_percentage_24h: number,
  total_supply: number,
  total_volume: number,
  id: string,
  current_price: number,
  image: string,
  symbol: string
}

const TokenDetails: React.FC<TokenDetailsProps> = ({ id }) => {
  const userBalance = getUserBalance();
  const [tokenData, setTokenData] = React.useState<TokenData>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetchCoinDataByID(id);
  }, [id]);

 
  const fetchCoinDataByID = (id: string) => {
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': process.env.NEXT_PUBLIC_COINGECKO_API_KEY || ''}
    };
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}`, options)
    .then(response => {
      response.json()
      .then(data => {
        if (data && data.length > 0) {
          setTokenData(data[0]);
        } else {
          console.error("Data is empty or not in expected format", data);
        }
      })
    })
    .catch(err => {
      console.error(err)
    });
  };


  return (
      <Card className="w-[480px]">
        {tokenData ? (
          <>
            <CardHeader>
                <CardTitle>
                  <div className="flex items-center">
                    <Image
                      alt='token'
                      className="aspect-square rounded-3xl object-cover mr-2"
                      height="32"
                      src={tokenData.image}
                      width="32"
                    />
                    <div className="flex space-x-2 items-baseline">
                      <h3 className="font-light">{tokenData.name}</h3>
                      <p className="text-sm opacity-20">{tokenData.symbol.toUpperCase()}</p>
                    </div>
                  </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between">
              <div className="flex flex-col space-y-2">
                <p className="text-xs font-light opacity-50">TOKEN PRICE</p>
                <p className="text-lg font-normal">${tokenData.current_price}</p>
                <p className="text-xs opacity-50 flex space-x-1">
                  <ChevronUp size={16} />
                  <span>{tokenData.price_change_percentage_24h.toFixed(2)}%</span>
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <p className="text-xs font-light opacity-50">YOUR HOLDINGS</p>
                <p className="text-lg font-normal">${tokenData.current_price}</p>
                <p className="text-xs opacity-50">{userBalance} {tokenData.symbol.toUpperCase()}</p>
              </div>
            </CardContent>
          </>
        )
        : (
          "Empty here"
        )}
      </Card>
  );
}

export default TokenDetails;

