"use client";

interface RiskGaugeProps {
  score: number;
  threshold: {
    low: number;
    medium: number;
    high: number;
  };
}

const SEGMENTS = [
  { label: "Low", color: "#4caf50" },
  { label: "Medium", color: "#ff9800" },
  { label: "High", color: "#f44336" }
];

export function RiskGauge({ score, threshold }: RiskGaugeProps) {
  const clampedScore = Math.max(0, Math.min(100, score));
  const angle = (clampedScore / 100) * Math.PI;
  const needleX = 100 + 80 * Math.cos(Math.PI - angle);
  const needleY = 100 + 80 * Math.sin(Math.PI - angle);

  return (
    <figure className="flex flex-col items-center" aria-labelledby="risk-gauge-title" role="group">
      <figcaption id="risk-gauge-title" className="mb-4 text-sm font-medium text-slate-600">
        Project Risk Score
      </figcaption>
      <div className="relative" role="img" aria-label={`Risk score is ${clampedScore} out of 100`}>
        <svg width={220} height={140} viewBox="0 0 200 120" className="drop-shadow-sm">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#4caf50" />
              <stop offset="50%" stopColor="#ff9800" />
              <stop offset="100%" stopColor="#f44336" />
            </linearGradient>
          </defs>
          <path d="M20 100 A80 80 0 0 1 180 100" stroke="url(#gaugeGradient)" strokeWidth={18} fill="none" strokeLinecap="round" />
          <line x1={100} y1={100} x2={needleX} y2={needleY} stroke="#1f2937" strokeWidth={4} strokeLinecap="round" />
          <circle cx={100} cy={100} r={6} fill="#1f2937" />
          <text x={30} y={115} fontSize={10} fill="#4caf50">
            0-30
          </text>
          <text x={90} y={115} fontSize={10} fill="#ff9800">
            31-60
          </text>
          <text x={150} y={115} fontSize={10} fill="#f44336">
            61-100
          </text>
        </svg>
        <div className="absolute inset-x-0 bottom-0 flex translate-y-10 flex-col items-center">
          <span className="text-3xl font-bold text-slate-900">{clampedScore}</span>
          <span className="text-xs uppercase tracking-wide text-slate-500">Current Score</span>
        </div>
      </div>
      <dl className="mt-12 grid w-full grid-cols-3 gap-4 text-center text-xs">
        {SEGMENTS.map((segment) => (
          <div key={segment.label} className="space-y-1 rounded-lg bg-slate-100 p-3">
            <dt className="font-semibold text-slate-700">{segment.label}</dt>
            <dd className="text-slate-500">
              {segment.label === "Low" && `0-${threshold.low}`}
              {segment.label === "Medium" && `${threshold.low + 1}-${threshold.medium}`}
              {segment.label === "High" && `${threshold.medium + 1}-${threshold.high}`}
            </dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}
