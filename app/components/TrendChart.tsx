"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

interface TrendChartProps {
  data: Array<{ month: string; critical: number; high: number; medium: number; low: number }>;
}

export function TrendChart({ data }: TrendChartProps) {
  return (
    <div className="h-80" role="img" aria-label="Monthly vulnerability trend by severity">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ left: 0, right: 0, top: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" allowDecimals={false} />
          <Tooltip contentStyle={{ fontSize: "0.75rem" }} />
          <Legend />
          <Line type="monotone" dataKey="critical" stroke="#d32f2f" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="high" stroke="#f44336" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="medium" stroke="#ff9800" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="low" stroke="#4caf50" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
