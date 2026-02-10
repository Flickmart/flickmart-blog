import GithubSlugger from "github-slugger";
import { isValidElement } from "react";

/**
 * Generate a single slug from text (creates a fresh slugger each time)
 * This ensures consistent behavior between server and client
 */
export function createSlug(text: string): string {
  const slugger = new GithubSlugger();
  return slugger.slug(text);
}

/**
 * Generate slugs for an array of headings in order
 * This ensures TOC and rendered headings have matching IDs
 */
export function generateHeadingSlugs(
  headings: Array<{ text: string; level: number }>
): Array<{ text: string; level: number; id: string }> {
  // Create a temporary slugger to generate IDs in the same order
  const tempSlugger = new GithubSlugger();

  return headings.map((heading) => ({
    ...heading,
    id: tempSlugger.slug(heading.text),
  }));
}

/**
 * This handles the case where children might be React nodes
 */
export function extractTextFromChildren(children: React.ReactNode): string {
  if (typeof children === "string") {
    return children;
  }

  if (typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join("");
  }

  if (isValidElement(children)) {
    // biome-ignore lint/suspicious/noExplicitAny: <>
    return extractTextFromChildren((children.props as any)?.children);
  }

  return "";
}
