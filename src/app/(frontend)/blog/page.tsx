import { BlogPageContent } from "@/components/blog-page-content";
import { CookieBanner } from "@/components/cookie-banner";
import { FlickMartHeader } from "@/components/flickmart-header";
import { demoBlogs } from "@/lib/demo-blogs";

export default function BlogPage() {
  const blogs = demoBlogs;

  return (
    <>
      <FlickMartHeader />
      <BlogPageContent blogs={blogs} />
      <CookieBanner />
    </>
  );
}
