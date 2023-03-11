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
		],
	},
};
