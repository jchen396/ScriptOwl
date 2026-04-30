/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        formats: ["image/avif", "image/webp"],
        remotePatterns: [
            {
                hostname: "localhost",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "https",
                hostname: "scriptowl-image-latest.onrender.com",
            },
        ],
    },
};

module.exports = nextConfig;
