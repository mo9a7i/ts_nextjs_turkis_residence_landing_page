/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NEXT_PUBLIC_EXPORT === 'true' ? 'export' : undefined,
  transpilePackages: ['@radix-ui/react-dropdown-menu'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
}

export default nextConfig;
