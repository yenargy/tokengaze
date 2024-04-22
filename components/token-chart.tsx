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

interface TokenDetailsProps {
  id: string;
}

const TokenChart: React.FC<TokenDetailsProps> = ({ id }) => {

  // React.useEffect(() => {
  //   fetchCoinDataByID(id);
  // }, [id]);

  // const fetchCoinDataByID = (id: string) => {
  //   const options = {
  //     method: 'GET',
  //     headers: {accept: 'application/json', 'x-cg-demo-api-key': process.env.NEXT_PUBLIC_COINGECKO_API_KEY || ''}
  //   };
  //   fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}`, options)
  //   .then(response => {
  //     response.json()
  //     .then(data => {
  //       if (data && data.length > 0) {
  //         setTokenData(data[0]);
  //       } else {
  //         console.error("Data is empty or not in expected format", data);
  //       }
  //     })
  //   })
  //   .catch(err => {
  //     console.error(err)
  //   });
  // };


  return (
    <Card className="w-full">
      <CardHeader>
          <CardTitle>
            24 hr Chart
          </CardTitle>
      </CardHeader>
      <CardContent>
        chart goes here
      </CardContent>
    </Card>
  );
}

export default TokenChart;

