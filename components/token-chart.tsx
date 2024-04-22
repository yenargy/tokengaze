"use client"

import * as React from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { convertDataToChartFormat } from "@/lib/utils";
import { COINGECKO_API_URL } from "@/config/constants";

interface TokenDetailsProps {
  id: string;
}

interface ChartData {
  time: string,
  price: number
}

const TokenChart: React.FC<TokenDetailsProps> = ({ id }) => {
  const [chartData, setChartData] = React.useState<ChartData[]>();

  React.useEffect(() => {
    fetchCoinDataByID(id);
  }, [id]);

  const fetchCoinDataByID = (id: string) => {
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': process.env.NEXT_PUBLIC_COINGECKO_API_KEY || ''}
    };
    fetch(`${COINGECKO_API_URL}/${id}/market_chart?vs_currency=usd&days=30`, options)
    .then(response => {
      response.json()
      .then(data => {
        console.log(data);
        const formattedChartData = convertDataToChartFormat(data.prices);
        setChartData(formattedChartData);
        console.log(formattedChartData);
      })
    })
    .catch(err => {
      console.error(err)
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-normal">24hr price change</CardTitle>
      </CardHeader>
      <CardContent className="pl-2 pt-8">
        <div className="h-[480px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 5,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-10"/>
              <XAxis dataKey="time" className="text-[10px] leading-12"/>
              <Tooltip />
              <Area type="monotone" dataKey="price" stroke="#8884d8" fill="#8884d8" />
              <YAxis className="text-[10px]" domain={["dataMin", "dataMax"]} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default TokenChart;

