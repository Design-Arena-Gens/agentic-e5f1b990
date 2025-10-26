"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface DensityChartProps {
  data: Array<{ project: string; density: number }>;
}

export function DensityChart({ data }: DensityChartProps) {
  return (
    <div className="h-80" role="img" aria-label="Vulnerability density per project">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 16, right: 16, bottom: 8, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="project" stroke="#94a3b8" tick={{ fontSize: 12 }} interval={0} angle={-20} textAnchor="end" height={70} />
          <YAxis stroke="#94a3b8" />
          <Tooltip contentStyle={{ fontSize: "0.75rem" }} />
          <Bar dataKey="density" radius={8} fill="#4c6cd4" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
