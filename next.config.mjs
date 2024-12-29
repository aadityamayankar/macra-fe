/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['page.jsx', 'page.js', 'page.tsx', 'page.ts', 'ts'],
    experimental: {
        // optimizePackageImports: true,
    }
};

export default nextConfig;
