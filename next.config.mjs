/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Keep fast builds during CI; do not fail on lint issues
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Do not block builds on type errors in prod
    ignoreBuildErrors: true,
  },
  // Enable standard Next.js image optimization pipeline
  images: {
    // default is optimized; leave for remote patterns via <Image src="/..." /> from public
  },
  poweredByHeader: false,
  compress: true,
  experimental: {
    // Shrink client bundles for large libs
    optimizePackageImports: ["lucide-react", "date-fns"],
  },
  async headers() {
    return [
      {
        // Cache Next.js generated static files
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Ensure optimized images are cached well
        source: "/_next/image",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ]
  },
}

export default nextConfig
