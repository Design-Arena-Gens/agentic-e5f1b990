export type Severity = "Critical" | "High" | "Medium" | "Low";

export interface Vulnerability {
  cve: string;
  severity: Severity;
  component: string;
  projects: string[];
  published: string;
  status: "Open" | "Suppressed" | "Mitigated";
}

export interface ProjectDependency {
  name: string;
  version: string;
  severity: Severity;
  vulnerabilities: number;
  children?: ProjectDependency[];
}

export interface ProjectNode {
  id: string;
  name: string;
  owner: string;
  risk: Severity;
  dependencies: ProjectDependency[];
}

export const vulnerabilities: Vulnerability[] = [
  {
    cve: "CVE-2024-10345",
    severity: "Critical",
    component: "log4j-core",
    projects: ["Enterprise Billing", "Supply Chain Tracker"],
    published: "2024-03-14",
    status: "Open"
  },
  {
    cve: "CVE-2023-51267",
    severity: "High",
    component: "spring-webflux",
    projects: ["IoT Device Gateway"],
    published: "2023-12-31",
    status: "Open"
  },
  {
    cve: "CVE-2022-17890",
    severity: "Medium",
    component: "react-client",
    projects: ["Customer Portal"],
    published: "2023-11-05",
    status: "Suppressed"
  },
  {
    cve: "CVE-2021-44321",
    severity: "Low",
    component: "lodash",
    projects: ["Internal Knowledgebase", "Developer Hub"],
    published: "2022-08-20",
    status: "Mitigated"
  }
];

export const projects: ProjectNode[] = [
  {
    id: "proj-1",
    name: "Enterprise Billing",
    owner: "Finance Platform",
    risk: "High",
    dependencies: [
      {
        name: "express",
        version: "4.18.2",
        severity: "Medium",
        vulnerabilities: 3,
        children: [
          {
            name: "qs",
            version: "6.11.2",
            severity: "Low",
            vulnerabilities: 1
          },
          {
            name: "debug",
            version: "4.3.4",
            severity: "Medium",
            vulnerabilities: 2
          }
        ]
      },
      {
        name: "log4j-core",
        version: "2.17.2",
        severity: "Critical",
        vulnerabilities: 4
      }
    ]
  },
  {
    id: "proj-2",
    name: "Supply Chain Tracker",
    owner: "Operations Intelligence",
    risk: "Critical",
    dependencies: [
      {
        name: "spring-webflux",
        version: "6.1.3",
        severity: "High",
        vulnerabilities: 5,
        children: [
          {
            name: "netty-handler",
            version: "4.1.101",
            severity: "High",
            vulnerabilities: 3
          }
        ]
      },
      {
        name: "postgresql",
        version: "42.6.0",
        severity: "Low",
        vulnerabilities: 0
      }
    ]
  },
  {
    id: "proj-3",
    name: "Customer Portal",
    owner: "Digital Experience",
    risk: "Medium",
    dependencies: [
      {
        name: "react",
        version: "18.2.0",
        severity: "Low",
        vulnerabilities: 0
      },
      {
        name: "axios",
        version: "1.6.5",
        severity: "Medium",
        vulnerabilities: 1
      }
    ]
  }
];

export const trendHistory = [
  { month: "Jan", critical: 14, high: 26, medium: 45, low: 60 },
  { month: "Feb", critical: 12, high: 22, medium: 40, low: 58 },
  { month: "Mar", critical: 10, high: 18, medium: 36, low: 54 },
  { month: "Apr", critical: 9, high: 16, medium: 32, low: 50 },
  { month: "May", critical: 8, high: 15, medium: 30, low: 45 }
];

export const densityMetrics = [
  { project: "Enterprise Billing", density: 3.2 },
  { project: "Supply Chain Tracker", density: 4.8 },
  { project: "Customer Portal", density: 1.6 },
  { project: "IoT Device Gateway", density: 2.9 }
];

export const riskScore = {
  score: 68,
  threshold: {
    low: 30,
    medium: 60,
    high: 85
  }
};
