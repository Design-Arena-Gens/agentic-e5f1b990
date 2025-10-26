"use client";

import { useMemo, useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { SeverityBadge } from "./components/SeverityBadge";
import { SuppressionModal } from "./components/SuppressionModal";
import { PortfolioTree } from "./components/PortfolioTree";
import { TrendChart } from "./components/TrendChart";
import { DensityChart } from "./components/DensityChart";
import { RiskGauge } from "./components/RiskGauge";
import {
  densityMetrics,
  projects,
  riskScore,
  trendHistory,
  type Vulnerability,
  vulnerabilities
} from "./data/dashboardData";

const tabDefinitions = [
  { id: "vulnerabilities", label: "Vulnerability Management" },
  { id: "portfolio", label: "Project Portfolio" },
  { id: "reporting", label: "Reporting" }
] as const;

interface SuppressedRecord {
  justification: string;
  expiresAt: string;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabDefinitions)[number]["id"]>("vulnerabilities");
  const [modalCve, setModalCve] = useState<string | null>(null);
  const [suppressed, setSuppressed] = useState<Record<string, SuppressedRecord>>({});
  const [announcement, setAnnouncement] = useState("");

  function openSuppressionModal(cve: string) {
    setModalCve(cve);
  }

  function handleModalSubmit({ cve, justification, expiresAt }: { cve: string; justification: string; expiresAt: string }) {
    setSuppressed((prev) => ({ ...prev, [cve]: { justification, expiresAt } }));
    setAnnouncement(`Suppressed ${cve} with expiration on ${expiresAt}.`);
    setModalCve(null);
  }

  const tableData = useMemo(() => {
    return vulnerabilities.map((vuln) => {
      const suppression = suppressed[vuln.cve];
      const status = suppression
        ? { label: "Suppressed", detail: `Until ${new Date(suppression.expiresAt).toLocaleDateString()}` }
        : { label: vuln.status, detail: null };

      return {
        ...vuln,
        status,
        suppression
      };
    });
  }, [suppressed]);

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      <aside className="hidden w-72 flex-none lg:block" aria-hidden={false}>
        <Sidebar />
      </aside>
      <div className="flex w-full flex-col">
        <Header />
        <main className="flex-1 px-6 pb-12 pt-8 lg:px-10" role="main">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Overview</p>
              <h2 className="text-2xl font-bold text-slate-900">Modernize vulnerability remediation</h2>
            </div>
            <button
              type="button"
              className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            >
              Export Executive Report
            </button>
          </div>

          <div className="border-b border-slate-200" role="tablist" aria-label="Dashboard sections">
            <div className="flex flex-wrap gap-4">
              {tabDefinitions.map((tab) => {
                const active = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-controls={`${tab.id}-panel`}
                    id={`${tab.id}-tab`}
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-t-lg border-b-2 px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${
                      active ? "border-primary-600 text-primary-700" : "border-transparent text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <section
            role="tabpanel"
            id="vulnerabilities-panel"
            aria-labelledby="vulnerabilities-tab"
            hidden={activeTab !== "vulnerabilities"}
            className="mt-8 space-y-6"
          >
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <header className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">CVE Inventory</h3>
                  <p className="text-sm text-slate-500">
                    Monitor active CVEs, status, and global suppression workflow across the portfolio.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                  >
                    Filter
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                  >
                    Columns
                  </button>
                </div>
              </header>
              <div className="mt-6 overflow-auto" role="region" aria-live="polite" aria-label="Vulnerability table">
                <table className="min-w-full divide-y divide-slate-200 text-left" aria-describedby="vulnerability-table-caption">
                  <caption id="vulnerability-table-caption" className="sr-only">
                    Table listing CVEs with severity, affected components, associated projects, and status.
                  </caption>
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold">CVE</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Severity</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Component</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Projects</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Published</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Status</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                    {tableData.map((row) => (
                      <tr key={row.cve} className="transition hover:bg-slate-50 focus-within:bg-slate-50">
                        <th scope="row" className="px-4 py-4 font-semibold text-slate-900">
                          {row.cve}
                        </th>
                        <td className="px-4 py-4">
                          <SeverityBadge severity={row.severity} />
                        </td>
                        <td className="px-4 py-4 text-slate-700">{row.component}</td>
                        <td className="px-4 py-4">
                          <ul className="space-y-1 text-sm text-slate-600">
                            {row.projects.map((project) => (
                              <li key={project}>{project}</li>
                            ))}
                          </ul>
                        </td>
                        <td className="px-4 py-4 text-slate-600">{new Date(row.published).toLocaleDateString()}</td>
                        <td className="px-4 py-4">
                          <div className="space-y-1">
                            <span className="text-sm font-semibold text-slate-800">{row.status.label}</span>
                            {row.status.detail && (
                              <p className="text-xs text-slate-500">{row.status.detail}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <button
                            type="button"
                            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-600 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                            onClick={() => openSuppressionModal(row.cve)}
                          >
                            Suppress
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section
            role="tabpanel"
            id="portfolio-panel"
            aria-labelledby="portfolio-tab"
            hidden={activeTab !== "portfolio"}
            className="mt-8"
          >
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Project Portfolio</h3>
                  <p className="text-sm text-slate-500">
                    Explore dependency hierarchies and drill into component-level exposure across projects.
                  </p>
                </div>
                <button
                  type="button"
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                >
                  Export SBOM
                </button>
              </header>
              <PortfolioTree projects={projects} />
            </div>
          </section>

          <section
            role="tabpanel"
            id="reporting-panel"
            aria-labelledby="reporting-tab"
            hidden={activeTab !== "reporting"}
            className="mt-8 space-y-6"
          >
            <div className="grid gap-6 lg:grid-cols-3" id="reporting">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
                <h3 className="text-lg font-semibold text-slate-900">Trend Analysis</h3>
                <p className="text-sm text-slate-500">
                  Track severity trendlines over time to identify emerging exposure patterns.
                </p>
                <div className="mt-6">
                  <TrendChart data={trendHistory} />
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <RiskGauge score={riskScore.score} threshold={riskScore.threshold} />
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Vulnerability Density</h3>
              <p className="text-sm text-slate-500">
                Understand hotspots across your asset inventory by measuring vulnerabilities per 1,000 components.
              </p>
              <div className="mt-6">
                <DensityChart data={densityMetrics} />
              </div>
            </div>
          </section>
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {announcement}
          </div>
        </main>
      </div>
      <SuppressionModal
        open={modalCve !== null}
        cve={modalCve}
        onClose={() => setModalCve(null)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}
