/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["egyhvri8i8.ufs.sh", "i.scdn.co", "cdn.sanity.io"],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint during builds
  },
  typescript: {
    ignoreBuildErrors: true, // Skip type checking during builds
  },
};

module.exports = nextConfig;
