/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
};

module.exports = nextConfig;

module.exports = {
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
		],
	},
};
