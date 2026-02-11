"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getBlogPosts } from "@/app/actions";
import { VideoEmbed } from "@/components/video-embed";
import { urlFor } from "@/lib/sanity";
import type { BlogPost } from "@/lib/types";

interface BlogListingProps {
  limit?: number;
}

export function BlogListing({ limit = 10 }: BlogListingProps) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const data = await getBlogPosts();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col">
        {[...Array(3)].map((_, i) => (
          <div
            className="flex animate-pulse gap-8 border-zinc-800/50 border-t py-10 max-md:flex-col"
            key={i}
          >
            <div className="aspect-[2] rounded-lg bg-zinc-700 md:aspect-[1.5] md:max-w-[216px]" />
            <div className="flex w-full flex-col justify-between">
              <div className="font-light">
                <div className="mb-3 h-4 w-32 rounded bg-zinc-700" />
                <div className="mt-3 h-6 w-3/4 rounded bg-zinc-700" />
                <div className="mt-2 h-4 w-full rounded bg-zinc-700" />
              </div>
              <div className="mt-4 xs:mt-6 flex xs:items-center justify-between gap-6">
                <div className="h-4 w-20 rounded bg-zinc-700" />
                <div className="flex gap-2">
                  <div className="h-6 w-12 rounded bg-zinc-700" />
                  <div className="h-6 w-16 rounded bg-zinc-700" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="py-12 text-center">
        <h3 className="mb-2 font-semibold text-2xl">No blog posts yet</h3>
        <p className="text-muted-foreground">
          Check back soon for new content!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {(limit ? blogs.slice(0, limit) : blogs).map((blog) => (
        <BlogCard blog={blog} key={blog._id} />
      ))}
    </div>
  );
}

function BlogCard({ blog }: { blog: BlogPost }) {
  return (
    <Link
      className="group flex gap-8 border-border border-t py-10 transition-all duration-300 max-md:flex-col"
      href={`/blog/${blog.slug}`}
    >
      {/* Video or Image Thumbnail */}
      {blog.mainVideo && blog.mainVideo.url ? (
        <div className="relative aspect-[2] overflow-hidden rounded-lg md:aspect-[1.5] md:max-w-[216px]">
          <VideoEmbed
            autoplay={true}
            className="h-full w-full"
            controls={false}
            loop={true}
            provider={blog.mainVideo.provider}
            title={blog.mainVideo.title}
            url={blog.mainVideo.url}
          />
        </div>
      ) : blog.mainImage ? (
        <div className="relative aspect-[2] overflow-hidden rounded-lg md:aspect-[1.5] md:max-w-[216px]">
          <Image
            alt={blog.mainImage.alt || blog.title}
            className="h-full w-full object-cover transition-all duration-800 group-hover:scale-105"
            height={144}
            src={urlFor(blog.mainImage)
              .width(216)
              .height(144)
              .quality(90)
              .url()}
            width={216}
          />
        </div>
      ) : null}

      {/* Content */}
      <div className="flex w-full flex-col justify-between">
        <div className="font-light">
          {/* Date and Read Time */}
          <div className="mb-3 flex items-center gap-4 text-sm text-text-muted">
            <span>
              {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {blog.readTime && <span>{blog.readTime} min read</span>}
          </div>

          {/* Title */}
          <h3 className="mt-3 line-clamp-2 font-display font-futsat font-semibold text-foreground text-lg leading-[1.4]">
            {blog.title}
          </h3>

          {/* Description */}
          <p className="mt-2 line-clamp-2 font-futsat text-text-muted max-md:text-sm">
            {blog.excerpt}
          </p>
        </div>

        {/* Bottom Section */}
        <div className="mt-4 flex justify-between gap-6 max-md:flex-col-reverse md:mt-6 md:items-center">
          {/* Read More Link */}
          <span className="min-w-max text-brand-primary text-sm transition-all duration-300 group-hover:text-brand-primary/80">
            Read more
            <ArrowRight className="ml-1 inline-block h-4 w-4 transition-all duration-300 group-hover:ml-2" />
          </span>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {blog.tags.slice(0, 3).map((tag) => (
                <li
                  className="rounded bg-surface-interactive px-2 py-1 font-mono text-text-muted text-xs tracking-tight"
                  key={tag}
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Link>
  );
}
