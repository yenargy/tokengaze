"use client"

import * as React from "react"
import { getUserBalance } from '@/lib/wallet-utils'
import { PriceChangeIndicator } from  '@/components/ui/price-change'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { COINGECKO_API_URL } from "@/config/constants"
import { formatCurrency } from "@coingecko/cryptoformat";

interface TokenDetailsProps {
  id: string,
  contract: string
}

interface TokenData {
  ath: number,
  name: string,
  price_change_percentage_24h: number,
  id: string,
  current_price: number,
  image: string,
  symbol: string,
  market_cap: number,
  fully_diluted_valuation: number,
  circulating_supply: number,
  total_supply: number,
}

const TokenDetails: React.FC<TokenDetailsProps> = ({ id, contract }) => {
  const userBalance = getUserBalance(contract);
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
    fetch(`${COINGECKO_API_URL}/markets?vs_currency=usd&ids=${id}`, options)
    .then(response => {
      response.json()
      .then(data => {
        if (data && data.length > 0) {
          setTokenData(data[0]);
          console.log(data[0]);
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
    tokenData ?
      <div className="flex flex-col space-y-4 w-[600px]">
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex items-center">
                <Image
                  alt='token'
                  className="aspect-square rounded-3xl object-cover mr-2"
                  height="24"
                  src={tokenData.image}
                  width="24"
                />
                <div className="flex space-x-2 items-baseline">
                  <h3 className="font-light text-xl">{tokenData.name}</h3>
                  <p className="text-sm opacity-20">{tokenData.symbol.toUpperCase()}</p>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between">
            <div className="flex flex-col space-y-2">
              <p className="text-xs font-light opacity-50">CURRENT PRICE</p>
              <p className="text-lg font-normal">{formatCurrency(tokenData.current_price, "USD", "en")}</p>
              <PriceChangeIndicator value={tokenData.price_change_percentage_24h} />
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-xs font-light opacity-50">YOUR HOLDINGS</p>
              <p className="text-lg font-normal">{formatCurrency((tokenData.current_price * Number(userBalance)), "USD", "en")}</p>
              <p className="text-xs opacity-50">{userBalance?.slice(0,5)} {tokenData.symbol.toUpperCase()}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col space-y-4 pt-8">
            <div className="flex w-full justify-between items-center">
              <p className="text-xs font-light opacity-50">ALL TIME HIGH</p>
              <p className="text-xs font-normal opacity-80">{formatCurrency(tokenData.ath, "USD", "en")}</p>
            </div>
            <div className="flex w-full justify-between items-center">
              <p className="text-xs font-light opacity-50">MARKET CAP</p>
              <p className="text-xs font-normal opacity-80">{formatCurrency(tokenData.market_cap, "USD", "en")}</p>
            </div>
            <div className="flex w-full justify-between items-center">
              <p className="text-xs font-light opacity-50">FDV</p>
              <p className="text-xs font-normal opacity-80">{formatCurrency(tokenData.fully_diluted_valuation, "USD", "en")}</p>
            </div>
            <div className="flex w-full justify-between items-center">
              <p className="text-xs font-light opacity-50">TOTAL SUPPLY</p>
              <p className="text-xs font-normal opacity-80">{formatCurrency(tokenData.total_supply, "", "en")} ETH</p>
            </div>
            <div className="flex w-full justify-between items-center">
              <p className="text-xs font-light opacity-50">CIRCULATING SUPPLY</p>
              <p className="text-xs font-normal opacity-80">{formatCurrency(tokenData.circulating_supply, "", "en")} ETH</p>
            </div>
          </CardContent>
        </Card>
      </div> 
    : (
      "Empty here"
    )
)};

export default TokenDetails;

