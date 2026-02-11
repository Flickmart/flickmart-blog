import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import type { BlogPost } from "@/lib/types";
import { useTheme } from "next-themes";

interface FlickMartBlogCardProps {
  blog: BlogPost;
  size?: "default" | "large";
  className?: string;
}

export function FlickMartBlogCard({
  blog,
  size = "default",
  className = "",
}: FlickMartBlogCardProps) {
  const isLarge = size === "large";
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Get image URL - use direct URL if available (for demo data), otherwise use Sanity urlFor
  const getImageUrl = () => {
    if (blog.mainImage?.asset?.url) {
      return blog.mainImage.asset.url;
    }
    if (blog.mainImage) {
      return urlFor(blog.mainImage)
        .width(isLarge ? 600 : 400)
        .height(isLarge ? 375 : 250)
        .quality(90)
        .url();
    }
    return null;
  };

  const imageUrl = getImageUrl();

  return (
    <Link
      href={`/blog/${blog.slug}`}
      className={`group flex flex-col overflow-hidden rounded-lg border transition-all duration-300 hover:shadow-lg ${
        isDark ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"
      } ${className}`}
    >
      {/* Image */}
      {imageUrl && (
        <div
          className={`relative overflow-hidden ${isDark ? "bg-gray-800" : "bg-gray-100"} ${isLarge ? "aspect-[16/10]" : "aspect-[16/10]"}`}
        >
          <Image
            alt={blog.mainImage?.alt || blog.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={imageUrl}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Title */}
        <h3
          className={`mb-3 line-clamp-2 text-xl font-bold transition-colors group-hover:text-[#FF6B00] ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {blog.title}
        </h3>

        {/* Author/Date */}
        <div
          className={`mb-3 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
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
            className={`mb-4 line-clamp-2 flex-1 text-sm leading-relaxed ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {blog.excerpt}
          </p>
        )}

        {/* Read More Button */}
        <div className="mt-auto">
          <span className="inline-flex items-center rounded-full bg-[#FF6B00] px-4 py-2 text-sm font-medium text-white transition-colors group-hover:bg-[#e65c00]">
            Read more
          </span>
        </div>
      </div>
    </Link>
  );
}
