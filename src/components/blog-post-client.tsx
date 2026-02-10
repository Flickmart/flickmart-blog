/** biome-ignore-all lint/suspicious/noExplicitAny: <> */
/** biome-ignore-all lint/style/noNestedTernary: <> */
"use client";

import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { useMemo, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import { components } from "@/components/portable-text";
import { TableOfContents } from "@/components/table-of-contents";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { HeadingsProvider } from "@/contexts/headings-context";
import { useTOC } from "@/contexts/toc-context";
import { urlFor } from "@/lib/sanity";
import { generateHeadingSlugs } from "@/utils/slug";

import { VideoEmbed } from "./video-embed";

interface BlogPostClientProps {
  post: {
    _id: string;
    title: string;
    excerpt: string;
    readTime: string;
    body?: any;
    mainImage?: any;
    mainVideo?: {
      url: string;
      title?: string;
      provider?: "youtube" | "vimeo" | "other";
      autoplay?: boolean;
      controls?: boolean;
      loop?: boolean;
    };
    publishedAt: string;
    tags?: string[];
    author: string;
  };
}

export function BlogPostClient({ post }: BlogPostClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { setHeadings } = useTOC();

  // Pre-generate heading data to ensure consistent IDs
  const headingsData = useMemo(() => {
    if (!(post.body && Array.isArray(post.body))) {
      return [];
    }

    const rawHeadings: Array<{ text: string; level: number }> = [];

    for (const block of post.body) {
      if (
        block._type === "block" &&
        block.style &&
        block.style.match(/^h[1-6]$/)
      ) {
        const level = Number.parseInt(block.style.substring(1));
        const text =
          block.children?.map((child: any) => child.text || "").join("") || "";

        if (text.trim()) {
          rawHeadings.push({
            text: text.trim(),
            level,
          });
        }
      }
    }

    return generateHeadingSlugs(rawHeadings);
  }, [post.body]);

  // Update TOC context with headings
  useEffect(() => {
    setHeadings(headingsData);

    // Cleanup when component unmounts
    return () => {
      setHeadings([]);
    };
  }, [headingsData, setHeadings]);

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative">
      <div className="pointer-events-none fixed top-0 left-0 z-50 w-full">
        {/* <div className="absolute top-0 left-0 h-24 w-full bg-white to-transparent backdrop-blur-xl [-webkit-mask-image:linear-gradient(to_bottom,black,transparent)] dark:bg-neutral-950" />
        <div className="absolute top-0 left-0 h-0.5 w-full dark:bg-[#111111]" />
        <ScrollProgress
          className="h-0.5 bg-[linear-gradient(to_right,rgba(0,0,0,0),#111111_75%,#111111_100%)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0),#ffffff_75%,#ffffff_100%)]"
          containerRef={containerRef}
          springOptions={{
            stiffness: 280,
            damping: 18,
            mass: 0.3,
          }}
        /> */}
      </div>
      <div className="lg:py-4" ref={containerRef}>
        <div className="mx-auto max-w-4xl lg:px-4 lg:py-8">
          {/* Banner */}
          {post.mainVideo && post.mainVideo.url ? (
            <div className="my-8">
              <VideoEmbed
                autoplay={true}
                controls={false}
                loop={true}
                provider={post.mainVideo.provider}
                title={post.mainVideo.title}
                url={post.mainVideo.url}
              />
            </div>
          ) : post.mainImage ? (
            <div className="relative mb-6 h-32 w-full overflow-hidden rounded-lg lg:h-64">
              <Image
                alt={post.mainImage.alt || post.title}
                className="rounded-lg object-cover"
                fill
                priority
                src={urlFor(post.mainImage)
                  .width(1200)
                  .height(600)
                  .quality(90)
                  .url()}
              />
            </div>
          ) : null}

          <div className="flex flex-col gap-8 max-lg:px-3">
            <article className="w-full min-w-0">
              <header className="mb-8 leading-tight lg:mb-14">
                <div className="mb-4 flex items-center gap-4 text-text-muted text-sm lg:my-4 lg:text-md">
                  <span>{formattedDate}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h1 className="mb-4 break-words font-futsat font-semibold text-3xl leading-tight text-foreground lg:text-4xl">
                  {post.title}
                </h1>
                <p className="mb-4 break-words text-muted-foreground text-sm md:text-md">
                  {post.excerpt}
                </p>

                <div className="mt-6 flex flex-wrap gap-3 lg:p-2">
                  {post.tags?.map((tag) => (
                    <Badge
                      className="rounded-sm bg-muted font-light text-xs text-foreground"
                      key={tag}
                      variant="secondary"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </header>
              <Separator />
              <HeadingsProvider headings={headingsData}>
                <div className="prose prose-lg dark:prose-invert w-full max-w-full font-switzerRegular max-lg:text-sm">
                  {post.body && (
                    <PortableText
                      components={components(theme || "dark")}
                      value={post.body}
                    />
                  )}
                </div>

                {/* Table of Contents at the bottom */}
                {headingsData.length > 0 && (
                  <div className="mt-12 border-border border-t pt-8">
                    <TableOfContents headings={headingsData} />
                  </div>
                )}
              </HeadingsProvider>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
