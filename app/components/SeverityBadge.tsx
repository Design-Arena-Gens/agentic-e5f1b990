import clsx from "classnames";
import type { Severity } from "../data/dashboardData";

const severityStyles: Record<Severity, string> = {
  Critical: "bg-severity-critical/10 text-severity-critical",
  High: "bg-severity-high/10 text-severity-high",
  Medium: "bg-severity-medium/10 text-severity-medium",
  Low: "bg-severity-low/10 text-severity-low"
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide",
        severityStyles[severity]
      )}
    >
      {severity}
    </span>
  );
}
