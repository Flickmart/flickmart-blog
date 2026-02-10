"use client";

import { createContext, useContext } from "react";

interface HeadingData {
  id: string;
  text: string;
  level: number;
}

interface HeadingsContextType {
  headings: HeadingData[];
  getHeadingId: (text: string) => string;
}

const HeadingsContext = createContext<HeadingsContextType | null>(null);

export function HeadingsProvider({
  children,
  headings,
}: {
  children: React.ReactNode;
  headings: HeadingData[];
}) {
  const getHeadingId = (text: string): string => {
    const heading = headings.find((h) => h.text === text);
    return heading?.id || text.toLowerCase().replace(/\s+/g, "-");
  };

  return (
    <HeadingsContext.Provider value={{ headings, getHeadingId }}>
      {children}
    </HeadingsContext.Provider>
  );
}

export function useHeadings() {
  const context = useContext(HeadingsContext);
  if (!context) {
    throw new Error("useHeadings must be used within a HeadingsProvider");
  }
  return context;
}
