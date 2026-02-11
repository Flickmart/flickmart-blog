"use client";

import { FlickMartBlogCard } from "./flickmart-blog-card";
import { demoBlogs } from "@/lib/demo-blogs";
import { useTheme } from "next-themes";
import { urlFor } from "@/lib/sanity";
import type { BlogPost } from "@/lib/types";

export function FlickMartHome() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const recentBlogs = demoBlogs.slice(0, 3);
  const allBlogs = demoBlogs.slice(4);

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-950" : "bg-white"}`}>
      {/* Recent Blog Posts */}
      <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2
            className={`mb-8 text-2xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Recent blog posts
          </h2>

          {recentBlogs.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 md:grid-rows-2 ">
              <FlickMartBlogCard
                blog={recentBlogs[0]}
                key={recentBlogs[0]._id}
                className="md:row-span-2 max-h-[450px]"
              />
              {recentBlogs.slice(1).map((blog) => (
                <RecentBlogCard blog={blog} key={blog._id} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className={isDark ? "text-gray-400" : "text-gray-500"}>
                No recent blog posts yet.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* All Blog Posts */}
      {allBlogs.length > 0 && (
        <section
          className={`border-t px-4 py-12 sm:px-6 sm:py-16 lg:px-8 ${
            isDark ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <div className="mx-auto max-w-7xl">
            <h2
              className={`mb-8 text-2xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              All blog posts
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {allBlogs.map((blog) => (
                <FlickMartBlogCard blog={blog} key={blog._id} size="large" />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

const RecentBlogCard = ({ blog }: { blog: BlogPost }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Get image URL - use direct URL if available (for demo data), otherwise use Sanity urlFor
  const getImageUrl = () => {
    if (blog.mainImage?.asset?.url) {
      return blog.mainImage.asset.url;
    }
    if (blog.mainImage) {
      return urlFor(blog.mainImage).width(400).height(250).quality(90).url();
    }
    return null;
  };

  const imageUrl = getImageUrl();

  return (
    <div
      className={`group flex overflow-hidden rounded-lg border ${
        isDark ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"
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
      <div className="flex flex-1 flex-col p-4 h-[200px]">
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
};
