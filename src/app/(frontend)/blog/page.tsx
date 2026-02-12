import { getBlogPosts } from "@/app/actions";
import { BlogPageContent } from "@/components/blog-page-content";
import { CookieBanner } from "@/components/cookie-banner";
import { FlickMartHeader } from "@/components/flickmart-header";

export default async function BlogPage() {
  const blogs = await getBlogPosts();

  return (
    <>
      <FlickMartHeader />
      <BlogPageContent blogs={blogs} />
      <CookieBanner />
    </>
  );
}
