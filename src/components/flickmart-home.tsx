"use client";

import { FlickMartBlogCard } from "./flickmart-blog-card";
import { demoBlogs } from "@/lib/demo-blogs";
import { useTheme } from "next-themes";

export function FlickMartHome() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const recentBlogs = demoBlogs.slice(0, 4);
  const allBlogs = demoBlogs.slice(4);

  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-950" : "bg-white"}`}>
      {/* Hero Section */}
      <section
        className={`border-b px-4 py-16 sm:px-6 lg:px-8 ${
          isDark ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-gray-50"
        }`}
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1
              className={`text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Welcome to <span className="text-[#FF6B00]">FlickMart</span> Blog
            </h1>
            <p
              className={`mt-6 text-lg leading-8 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Insights, stories, and updates from the FlickMart team. Discover
              our journey, learn from our experiences, and stay updated with the
              latest news.
            </p>
          </div>
        </div>
      </section>

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
            <div className="grid gap-6 md:grid-cols-2">
              {recentBlogs.map((blog) => (
                <FlickMartBlogCard blog={blog} key={blog._id} />
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
