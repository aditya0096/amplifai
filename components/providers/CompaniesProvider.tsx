"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Company type
export type Company = {
  id: number;
  name: string;
  logo: string;
  ceo: { name: string; avatar: string };
  revenue: string;
  profit: string;
  ebitda: string;
  grossMargin: number;
  keyInsights: string[];
  revenueChange: "positive" | "negative";
  profitChange: "positive" | "negative";
};

const initialCompanies: Company[] = [
  {
    id: 1,
    name: 'Global Tech Solutions',
    logo: '🔴',
    ceo: { name: 'Nichol James', avatar: '👨‍💼' },
    revenue: '€245M',
    profit: '€55M',
    ebitda: '€75M',
    grossMargin: 28.5,
    keyInsights: ['Strong Growth', 'Growth Leader', 'Tech'],
    revenueChange: 'positive',
    profitChange: 'positive',
  },
  {
    id: 2,
    name: 'Tech Innovation Corp',
    logo: '🟣',
    ceo: { name: 'Alex Morgan', avatar: '👩‍💼' },
    revenue: '€342M',
    profit: '€40M',
    ebitda: '€53M',
    grossMargin: 22.3,
    keyInsights: ['High Productivity', 'Good Growth'],
    revenueChange: 'positive',
    profitChange: 'positive'
  },
  {
    id: 3,
    name: 'NexGen Innovations',
    logo: '🟡',
    ceo: { name: 'Jordan Lee', avatar: '👨‍💼' },
    revenue: '€224M',
    profit: '€10M',
    ebitda: '€12M',
    grossMargin: 18.5,
    keyInsights: ['Robust Expansion', 'Tech sector leader'],
    revenueChange: 'negative',
    profitChange: 'positive'
  },
  {
    id: 4,
    name: 'Synergy Solutions',
    logo: '🟠',
    ceo: { name: 'Martin Luther', avatar: '👨‍💼' },
    revenue: '€85M',
    profit: '€25M',
    ebitda: '€20M',
    grossMargin: 13.6,
    keyInsights: ['Poor Expansion', 'Loss making'],
    revenueChange: 'positive',
    profitChange: 'negative'
  },
  {
    id: 5,
    name: 'Vertex Global Services',
    logo: '🔵',
    ceo: { name: 'Jatin Mehta', avatar: '👨‍💼' },
    revenue: '€120M',
    profit: '€12M',
    ebitda: '€10M',
    grossMargin: 5.4,
    keyInsights: ['Restructuring Phase', 'Strategic Pivot'],
    revenueChange: 'negative',
    profitChange: 'positive'
  },
  {
    id: 6,
    name: 'Nordic Systems AB',
    logo: '🟢',
    ceo: { name: 'Jay Dublin', avatar: '👨‍💼' },
    revenue: '€310M',
    profit: '€2M',
    ebitda: '€15M',
    grossMargin: 0.6,
    keyInsights: ['Struggling sector', 'Marketing', 'Loss-Making Company'],
    revenueChange: 'negative',
    profitChange: 'negative'
  },
  {
    id: 7,
    name: 'Quantum Computing Inc',
    logo: '🟪',
    ceo: { name: 'Jay Dublin', avatar: '👨‍💼' },
    revenue: '€20M',
    profit: '€15M',
    ebitda: '€2M',
    grossMargin: 30.1,
    keyInsights: ['Market Leader', 'Cost Optimization'],
    revenueChange: 'positive',
    profitChange: 'positive'
  },
  {
    id: 8,
    name: 'Pinnacle Systems',
    logo: '🔷',
    ceo: { name: 'Jay Dublin', avatar: '👨‍💼' },
    revenue: '€275M',
    profit: '€50M',
    ebitda: '€6M',
    grossMargin: 19.8,
    keyInsights: ['Reliable Returns', 'Strong Balance Sheet'],
    revenueChange: 'positive',
    profitChange: 'positive'
  },
  {
    id: 9,
    name: 'Pacific Solutions Ltd',
    logo: '🟤',
    ceo: { name: 'Jay Dublin', avatar: '👨‍💼' },
    revenue: '€400M',
    profit: '€3M',
    ebitda: '€9M',
    grossMargin: 16.2,
    keyInsights: ['Solid Financial Track Record', 'Investor-Friendly'],
    revenueChange: 'negative',
    profitChange: 'positive'
  },
  {
    id: 10,
    name: 'Innovatech Dynamics',
    logo: '⚫',
    ceo: { name: 'Jay Dublin', avatar: '👨‍💼' },
    revenue: '€90M',
    profit: '€20M',
    ebitda: '€20M',
    grossMargin: 9.7,
    keyInsights: ['Liquidity Crunch', 'High Overheads'],
    revenueChange: 'negative',
    profitChange: 'negative'
  },
  {
    id: 11,
    name: 'Technosphere Groups',
    logo: '🔶',
    ceo: { name: 'Jay Dublin', avatar: '👨‍💼' },
    revenue: '€230M',
    profit: '€15M',
    ebitda: '€20M',
    grossMargin: 3.5,
    keyInsights: ['Reliable Returns', 'Strength - Services'],
    revenueChange: 'positive',
    profitChange: 'positive'
  }
  // ...add more initial companies as needed
];

export const CompaniesContext = createContext<{
  companies: Company[];
  addCompany: (company: Omit<Company, "id">) => void;
} | undefined>(undefined);

export function CompaniesProvider({ children }: { children: ReactNode }) {
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);

  const addCompany = (company: Omit<Company, "id">) => {
    setCompanies((prev) => [
      ...prev,
      { ...company, id: prev.length ? prev[prev.length - 1].id + 1 : 1 },
    ]);
  };

  return (
    <CompaniesContext.Provider value={{ companies, addCompany }}>
      {children}
    </CompaniesContext.Provider>
  );
}

export function useCompanies() {
  const ctx = useContext(CompaniesContext);
  if (!ctx) throw new Error("useCompanies must be used within CompaniesProvider");
  return ctx;
}
