/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
	},
	// https://nextjs.org/docs/pages/api-reference/next-config-js/output
	output: 'standalone',
};

export default nextConfig;
