"use client"

import * as React from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { parseChartData } from "@/lib/utils";
import { COINGECKO_API_URL } from "@/config/constants";
import { formatCurrency } from "@coingecko/cryptoformat";

interface TokenDetailsProps {
  id: string;
}

interface ChartData {
  date: string,
  price: number,
  priceText: string
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
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
    fetch(`${COINGECKO_API_URL}/${id}/market_chart?vs_currency=usd&days=30&interval=daily`, options)
    .then(response => {
      response.json()
      .then(data => {
        const formattedChartData = parseChartData(data.prices);
        console.log(formattedChartData);
        setChartData(formattedChartData);
      })
    })
    .catch(err => {
      console.error(err)
    });
  };

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="backdrop-blur-xl bg-white/10 p-2">
          <p className="text-[10px] opacity-50 pb-2">{label}</p>
          <p className="text-base">{formatCurrency(payload[0].value, "USD", "en")}</p>
        </div>
      );
    }
  
    return null;
  };

  const CustomActiveDot: React.FC<any> = (props) => {
    return (
      <circle cx={props.cx} cy={props.cy} r={10} fill="url(#activeDot)" className="blur-xs"/>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-normal opacity-50">PRICE ACTION IN PAST 30 DAYS</CardTitle>
      </CardHeader>
      <CardContent className="pl-2 pt-8">
        <div className="h-[480px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 0,
                right: 10,
                left: -20,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8E72FF" stopOpacity={1}/>
                  <stop offset="100%" stopColor="#BE4ADB" stopOpacity={0.2}/>
                </linearGradient>
                <radialGradient id="activeDot" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#BCACFF" stopOpacity={1}/>
                  <stop offset="20%" stopColor="#BCACFF" stopOpacity={0.4}/>
                  <stop offset="80%" stopColor="#8E72FF" stopOpacity={0.1}/>
                  <stop offset="100%" stopColor="#8E72FF" stopOpacity={0}/>
                </radialGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="opacity-10"/>
              <XAxis tickLine={false} tickMargin={10} dataKey="date" className="text-[9px]"/>
              <YAxis tickLine={false} className="text-[9px]" domain={['auto', 'auto']}/>
              <Tooltip animationDuration={300} content={<CustomTooltip />} />
              <Area type="monotone" dataKey="price" stroke="none" fill="url(#chartGradient)" animationDuration={300} activeDot={<CustomActiveDot />}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default TokenChart;

