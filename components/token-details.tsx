"use client"

import * as React from "react"
import { getUserBalance } from '@/hooks/getUserBalance'
import { PriceChangeIndicator } from  '@/components/ui/price-change'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { COINGECKO_API_URL } from "@/config/constants"
import { formatCurrency } from "@coingecko/cryptoformat"
import TokenItem from './ui/token-item'
import { Skeleton } from "@/components/ui/skeleton"

interface TokenDetailsProps {
  id: string,
  contract: string
}

interface TokenPriceData {
  name: string;
  id: string;
  symbol: string;
  image: string;
  price_change_percentage_24h: number;
  current_price: number;
}

interface TokenMarketData {
  ath: number;
  market_cap: number;
  fully_diluted_valuation: number;
  circulating_supply: number;
  total_supply: number;
}

const TokenDetails: React.FC<TokenDetailsProps> = ({ id, contract }) => {
  const userBalance = getUserBalance(contract);
  const [tokenPriceData, setTokenPriceData] = React.useState<TokenPriceData>();
  const [tokenMarketData, setTokenMarketData] = React.useState<TokenMarketData>();
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    setTokenPriceData(undefined);
    setTokenMarketData(undefined);
    fetchCoinDataByID(id);
  }, [id]);

 
  const fetchCoinDataByID = (id: string) => {
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': process.env.NEXT_PUBLIC_COINGECKO_API_KEY || ''}
    };
    fetch(`${COINGECKO_API_URL}/markets?vs_currency=usd&ids=${id}`, options)
    .then(response => {
      response.json()
      .then(data => {
        if (data && data.length > 0) {
          const fetchedData = data[0];
          console.log(fetchedData);

          // Setting new state variables
          setTokenPriceData({
            name: fetchedData.name,
            id: fetchedData.id,
            symbol: fetchedData.symbol,
            image: fetchedData.image,
            price_change_percentage_24h: fetchedData.price_change_percentage_24h,
            current_price: fetchedData.current_price,
          });

          setTokenMarketData({
            ath: fetchedData.ath,
            market_cap: fetchedData.market_cap,
            fully_diluted_valuation: fetchedData.fully_diluted_valuation,
            circulating_supply: fetchedData.circulating_supply,
            total_supply: fetchedData.total_supply,
        });
       } else {
          console.error("Data is empty or not in expected format", data);
        }
      })
    })
    .catch(err => {
      console.error(err)
    });
  };

  return (tokenPriceData ?
    <div className="flex flex-col space-y-4 max-w-full w-full lg:w-[600px]">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center">
              <Image
                alt='token'
                className="aspect-square rounded-3xl object-cover mr-2"
                height="24"
                src={tokenPriceData.image}
                width="24"
              />
              <div className="flex space-x-2 items-baseline">
                <h3 className="font-light text-xl">{tokenPriceData.name}</h3>
                <p className="text-sm opacity-20">{tokenPriceData.symbol.toUpperCase()}</p>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between">
          <div className="flex flex-col space-y-2">
            <p className="text-xs font-light opacity-50">CURRENT PRICE</p>
            <p className="text-lg font-normal">{formatCurrency(tokenPriceData.current_price, "USD", "en")}</p>
            <PriceChangeIndicator value={tokenPriceData.price_change_percentage_24h} />
          </div>
          <div className="flex flex-col space-y-2">
            <p className="text-xs font-light bg-gradient-to-r from-indigo-400 to-green-300 inline-block text-transparent bg-clip-text">YOUR HOLDINGS</p>
            <p className="text-lg font-normal box-shadow-lg shadow-cyan-500/50">{formatCurrency((tokenPriceData.current_price * Number(userBalance || 0)), "USD", "en")}</p>
            <p className="text-xs opacity-50">{userBalance?.slice(0,5)} {tokenPriceData.symbol.toUpperCase()}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col space-y-4 pt-8">
        {[
          { label: "ALL TIME HIGH", value: tokenMarketData?.ath, format: "USD" },
          { label: "MARKET CAP", value: tokenMarketData?.market_cap, format: "USD" },
          { label: "FDV", value: tokenMarketData?.fully_diluted_valuation, format: "USD" },
          { label: "TOTAL SUPPLY", value: tokenMarketData?.total_supply, format: "" },
          { label: "CIRCULATING SUPPLY", value: tokenMarketData?.circulating_supply, format: "" },
        ].map(({ label, value, format }) => (
          <TokenItem key={label} label={label} value={formatCurrency(value || 0, format, "en")}/>
        ))}
        </CardContent>
      </Card>
    </div> 
    : 
    <div className="flex flex-col space-y-4 w-[600px]">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4 pb-12">
          <Skeleton className="h-4 w-3/5" />
          <Skeleton className="h-4 w-2/5" />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col space-y-4 pt-12 pb-20">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/4" />
        </CardContent>
      </Card>
    </div> 
  )
};

export default TokenDetails;

