/** biome-ignore-all lint/complexity/noForEach: <> */
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface HeadingNode {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: HeadingNode[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const elementId = entry.target.id;
          const isIntersecting = entry.isIntersecting;

          if (isIntersecting) {
            setActiveId(elementId);
          }
        });
      },
      {
        rootMargin: "-10% 0px -80% 0px",
        threshold: 0,
      },
    );

    let observedCount = 0;

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
        observedCount++;
      } else {
        console.warn();
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [headings]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.log(
        "TOC: Element not found! Available IDs:",
        Array.from(document.querySelectorAll("[id]")).map((el) => el.id),
      );
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Table of contents" className="space-y-3">
      <h3 className="font-bold font-futsat dark:text-white text-xl lg:text-2xl">
        Table of Contents
      </h3>
      <div className="space-y-2">
        {headings.map((heading) => (
          <button
            aria-current={activeId === heading.id ? "location" : undefined}
            className={cn(
              "block w-full text-left font-switzerRegular text-sm transition-colors",
              "dark:hover:text-white hover:text-black",
              activeId === heading.id
                ? "font-medium dark:text-white text-black"
                : "text-[#A1A1AA]",
              heading.level === 2 && "pl-0",
              heading.level === 3 && "pl-4",
              heading.level === 4 && "pl-8",
              heading.level === 5 && "pl-12",
              heading.level === 6 && "pl-16",
            )}
            key={heading.id}
            onClick={() => scrollToSection(heading.id)}
            type="button"
          >
            {heading.text}{" "}
            {activeId === heading.id && (
              <span className="ml-1 rounded-full border border-brand-primary/20 text-brand-accent p-2 text-emerald-400 bg-brand-primary/10 text-xs">
                current
              </span>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
