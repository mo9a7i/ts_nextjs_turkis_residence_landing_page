/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
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
  basePath: process.env.NODE_ENV === 'production' ? '/ts_nextjs_turkis_residence_landing_page' : '',
}

export default nextConfig;
