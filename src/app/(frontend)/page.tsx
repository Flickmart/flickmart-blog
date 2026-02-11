import { CookieBanner } from "@/components/cookie-banner";
import { FlickMartHeader } from "@/components/flickmart-header";
import { FlickMartHome } from "@/components/flickmart-home";

export default function Page() {
  return (
    <>
      <FlickMartHeader />
      <FlickMartHome />
      <CookieBanner />
    </>
  );
}
