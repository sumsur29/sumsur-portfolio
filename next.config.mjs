/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingExcludes: {
      '/photos/**': [
        './public/photos/**/*'
      ],
    },
  },
};

export default nextConfig;
