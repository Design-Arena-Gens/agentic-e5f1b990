"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import type { ProjectDependency, ProjectNode } from "../data/dashboardData";
import { SeverityBadge } from "./SeverityBadge";

interface PortfolioTreeProps {
  projects: ProjectNode[];
}

function IconWrapper({ open }: { open: boolean }) {
  return open ? (
    <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
  ) : (
    <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
  );
}

function DependencyNode({ dependency }: { dependency: ProjectDependency }) {
  const [open, setOpen] = useState(false);
  const hasChildren = Boolean(dependency.children?.length);

  return (
    <li className="border-l border-slate-200 pl-4" role="treeitem" aria-expanded={hasChildren ? open : undefined} aria-selected={false}>
      <div className="flex items-start justify-between gap-3 py-2">
        <div className="flex flex-1 items-center gap-2">
          {hasChildren && (
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="rounded-md border border-slate-200 bg-white p-1 text-slate-500 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              aria-expanded={open}
              aria-label={`${open ? "Collapse" : "Expand"} ${dependency.name}`}
            >
              <IconWrapper open={open} />
            </button>
          )}
          {!hasChildren && <span className="h-6 w-6" aria-hidden="true" />} {/* placeholder for alignment */}
          <div>
            <p className="text-sm font-semibold text-slate-800">
              {dependency.name} <span className="font-normal text-slate-500">v{dependency.version}</span>
            </p>
            <p className="text-xs text-slate-500">{dependency.vulnerabilities} known vulnerabilities</p>
          </div>
        </div>
        <SeverityBadge severity={dependency.severity} />
      </div>
      {hasChildren && open && (
        <ul className="ml-6 border-l border-dashed border-slate-200 pl-4" role="group">
          {dependency.children!.map((child) => (
            <DependencyNode key={`${dependency.name}-${child.name}`} dependency={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function PortfolioTree({ projects }: PortfolioTreeProps) {
  const [expandedProjects, setExpandedProjects] = useState<string[]>(projects.map((project) => project.id));

  function toggleProject(id: string) {
    setExpandedProjects((prev) =>
      prev.includes(id) ? prev.filter((projectId) => projectId !== id) : [...prev, id]
    );
  }

  return (
    <div className="space-y-4" role="tree">
      {projects.map((project) => {
        const open = expandedProjects.includes(project.id);
        return (
          <section
            key={project.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            role="treeitem"
            aria-expanded={open}
            aria-selected={false}
          >
            <header className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{project.name}</h3>
                <p className="text-sm text-slate-500">Owned by {project.owner}</p>
              </div>
              <div className="flex items-center gap-3">
                <SeverityBadge severity={project.risk} />
                <button
                  type="button"
                  onClick={() => toggleProject(project.id)}
                  className="rounded-lg border border-slate-200 px-3 py-1 text-sm font-medium text-slate-600 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                  aria-controls={`project-${project.id}`}
                  aria-expanded={open}
                >
                  {open ? "Collapse" : "Expand"}
                </button>
              </div>
            </header>
            {open && (
              <div id={`project-${project.id}`} className="mt-4">
                <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Dependencies
                </h4>
                <ul className="mt-2 space-y-2" role="group">
                  {project.dependencies.map((dependency) => (
                    <DependencyNode key={`${project.id}-${dependency.name}`} dependency={dependency} />
                  ))}
                </ul>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
