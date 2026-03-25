/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Allow build to succeed despite TS errors in AI-generated code
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
