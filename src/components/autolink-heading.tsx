"use client";

import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import type { JSX } from "react/jsx-runtime";
import { useHeadings } from "@/contexts/headings-context";
import { cn } from "@/lib/utils";
import { extractTextFromChildren } from "@/utils/slug";

interface AutolinkHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
  className?: string;
}

export function AutolinkHeading({
  level,
  children,
  className,
}: AutolinkHeadingProps) {
  const pathname = usePathname();
  const { getHeadingId } = useHeadings();
  const text = extractTextFromChildren(children);
  const id = getHeadingId(text);
  const href = `${pathname}#${id}`;

  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      // Update URL without triggering navigation
      window.history.pushState(null, "", href);
    }
  };

  return (
    <HeadingTag
      className={cn("group relative scroll-mt-20", className)}
      id={id}
    >
      <Link
        className="inline-flex items-center gap-2 text-inherit no-underline hover:text-inherit hover:no-underline"
        href={href}
        onClick={handleClick}
      >
        {children}
        <LinkIcon
          aria-label={`Link to ${text}`}
          className="hover:!opacity-100 h-4 w-4 flex-shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-60"
        />
      </Link>
    </HeadingTag>
  );
}
