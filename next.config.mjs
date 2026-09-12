/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'arete.assoc.cse.nitc.ac.in',
        pathname: '/**',
      },
    ],
  }
};

export default nextConfig;
