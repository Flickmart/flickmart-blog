"use client";

import { useTheme } from "next-themes";
import { FlickMartBlogCard } from "@/components/flickmart-blog-card";
import type { BlogPost } from "@/lib/types";

export function BlogPageContent({ blogs }: { blogs: BlogPost[] }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen px-4 py-12 sm:px-6 sm:py-16 lg:px-8 ${
        isDark ? "bg-gray-950" : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-12 text-center sm:text-left">
          <h1
            className={`font-bold text-3xl tracking-tight sm:text-4xl md:text-5xl ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            All Blog Posts
          </h1>
          <p
            className={`mt-4 text-lg ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Explore insights, stories, and updates from the FlickMart team.
          </p>
        </div>

        {/* Blog Grid */}
        {blogs.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <FlickMartBlogCard blog={blog} key={blog._id} size="large" />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className={isDark ? "text-gray-400" : "text-gray-500"}>
              No blog posts yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
