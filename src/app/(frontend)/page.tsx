import { getLatestPosts } from "@/app/actions";
import { CookieBanner } from "@/components/cookie-banner";
import { FlickMartHeader } from "@/components/flickmart-header";
import { FlickMartHome } from "@/components/flickmart-home";

export default async function Page() {
  const blogs = await getLatestPosts();

  return (
    <>
      <FlickMartHeader />
      <FlickMartHome blogs={blogs} />
      <CookieBanner />
    </>
  );
}
