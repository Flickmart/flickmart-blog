import { FolderKanban } from "lucide-react";
import { CustomButton } from "@/components/custom-button";
import { BlogListing } from "./blog-page";

export default function Blog() {
  return (
    <div className="min-h-screen w-full px-4 py-12 sm:px-6 sm:py-16 md:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-6 sm:space-y-8">
        {/* Projects Header */}
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-950/50 px-2.5 py-1 text-emerald-400 sm:px-3 sm:py-1.5">
          <FolderKanban className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span className="font-medium text-xs sm:text-sm">Blog</span>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl space-y-4">
            <h1 className="max-w-sm font-semibold text-3xl tracking-tight sm:text-4xl">
              Learning, Building, and Documenting{" "}
            </h1>
            <p className="text-gray-400 text-sm sm:text-md">
              Insights and experiences from my journey as a developer—exploring
              ideas, overcoming challenges, and sharing lessons learned along
              the way.
            </p>
          </div>
          <CustomButton href="/blog" text="View all articles" />
        </div>

        <div className="flex flex-col items-start gap-8">
          <BlogListing />
        </div>
      </div>
    </div>
  );
}
