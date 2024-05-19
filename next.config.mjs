/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
	},
	// https://nextjs.org/docs/pages/api-reference/next-config-js/output
	output: 'standalone',
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production',
	},
};

export default nextConfig;
