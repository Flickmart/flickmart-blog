import { FlickMartHeader } from "@/components/flickmart-header";
import { FlickMartHome } from "@/components/flickmart-home";
import { CookieBanner } from "@/components/cookie-banner";

export default function Page() {
  return (
    <>
      <FlickMartHeader />
      <FlickMartHome />
      <CookieBanner />
    </>
  );
}
