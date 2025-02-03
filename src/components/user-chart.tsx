"use client";

import { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  name: string;
  [key: string]: number | string;
}

interface UserChartProps {
  dataKey?: string;
}

export function UserChart({ dataKey = "total" }: UserChartProps) {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const chartData: ChartData[] = [
      {
        name: "Mon",
        total: Math.floor(Math.random() * 100),
        revenue: Math.floor(Math.random() * 1000),
        engagement: Math.floor(Math.random() * 100),
      },
      {
        name: "Tue",
        total: Math.floor(Math.random() * 100),
        revenue: Math.floor(Math.random() * 1000),
        engagement: Math.floor(Math.random() * 100),
      },
      {
        name: "Wed",
        total: Math.floor(Math.random() * 100),
        revenue: Math.floor(Math.random() * 1000),
        engagement: Math.floor(Math.random() * 100),
      },
      {
        name: "Thu",
        total: Math.floor(Math.random() * 100),
        revenue: Math.floor(Math.random() * 1000),
        engagement: Math.floor(Math.random() * 100),
      },
      {
        name: "Fri",
        total: Math.floor(Math.random() * 100),
        revenue: Math.floor(Math.random() * 1000),
        engagement: Math.floor(Math.random() * 100),
      },
      {
        name: "Sat",
        total: Math.floor(Math.random() * 100),
        revenue: Math.floor(Math.random() * 1000),
        engagement: Math.floor(Math.random() * 100),
      },
      {
        name: "Sun",
        total: Math.floor(Math.random() * 100),
        revenue: Math.floor(Math.random() * 1000),
        engagement: Math.floor(Math.random() * 100),
      },
    ];
    setData(chartData);
  }, []);

  const chartAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 280, friction: 60 },
  });

  return (
    <animated.div style={chartAnimation}>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip />
          <Bar
            dataKey={dataKey}
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-primary"
          />
        </BarChart>
      </ResponsiveContainer>
    </animated.div>
  );
}
