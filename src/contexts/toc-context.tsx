"use client";

import { createContext, type ReactNode, useContext, useState } from "react";

interface HeadingNode {
  id: string;
  text: string;
  level: number;
}

interface TOCContextType {
  headings: HeadingNode[];
  setHeadings: (headings: HeadingNode[]) => void;
}

const TOCContext = createContext<TOCContextType | undefined>(undefined);

export function TOCProvider({ children }: { children: ReactNode }) {
  const [headings, setHeadings] = useState<HeadingNode[]>([]);

  return (
    <TOCContext.Provider value={{ headings, setHeadings }}>
      {children}
    </TOCContext.Provider>
  );
}

export function useTOC() {
  const context = useContext(TOCContext);
  if (context === undefined) {
    throw new Error("useTOC must be used within a TOCProvider");
  }
  return context;
}
