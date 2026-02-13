// lib/sanity.ts
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Read-only client (your current one)
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: true, // Good for images/queries
});

// Write client for mutations (server-only)
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: false, // Required for mutations
  token: process.env.SANITY_TOKEN!, // Server-only token
});

const builder = imageUrlBuilder(client);
export function urlFor(source: any) {
  return builder.image(source);
}
