"use client";

import { urlFor } from "@/lib/sanity";
import type { BlogPost } from "@/lib/types";
import { useTheme } from "next-themes";

interface RecentBlogCardProps {
  blog: BlogPost;
}

export function RecentBlogCard({ blog }: RecentBlogCardProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Get image URL - use direct URL if available (for demo data), otherwise use Sanity urlFor
  const getImageUrl = () => {
    if (blog.mainImage?.asset?.url) {
      return blog.mainImage.asset.url;
    }
    if (blog.mainImage) {
      return urlFor(blog.mainImage)
        .width(400)
        .height(250)
        .quality(90)
        .url();
    }
    return null;
  };

  const imageUrl = getImageUrl();

  return (
    <div
      className={`group flex overflow-hidden rounded-lg ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >
      {/* Image - Left side */}
      {imageUrl && (
        <div
          className={`relative overflow-hidden w-1/2 h-[200px] ${
            isDark ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <img
            src={imageUrl}
            alt={blog.mainImage?.alt || blog.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      {/* Content - Right side */}
      <div className="flex flex-1 flex-col p-4 justify-center">
        {/* Title */}
        <h3
          className={`mb-2 line-clamp-2 text-lg font-bold transition-colors group-hover:text-[#FF6B00] ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {blog.title}
        </h3>

        {/* Author/Date */}
        <div
          className={`mb-2 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
        >
          {blog.author?.name && (
            <span className="font-medium">{blog.author.name}</span>
          )}
          {(blog.author?.name || blog.publishedAt) && (
            <span className="mx-2">•</span>
          )}
          {blog.publishedAt && (
            <span>
              {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          )}
        </div>

        {/* Excerpt */}
        {blog.excerpt && (
          <p
            className={`mb-3 line-clamp-2 text-sm leading-relaxed ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {blog.excerpt}
          </p>
        )}

        {/* Read More Button */}
        <div className="mt-auto">
          <span className="inline-flex items-center rounded-full bg-[#FF6B00] px-3 py-1.5 text-xs font-medium text-white transition-colors group-hover:bg-[#e65c00]">
            Read more
          </span>
        </div>
      </div>
    </div>
  );
}
