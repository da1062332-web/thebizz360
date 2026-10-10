/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export: the marketing site is deployed as plain files and
  // never touches the production application or its authentication.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
