/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.google.com"],
  },
  basePath: "",
  assetPrefix: "",
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
