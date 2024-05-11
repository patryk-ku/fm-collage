// import { Inter } from 'next/font/google';
import './globals.css';

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';

// const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: '.fm collage creator',
	description: 'Create collage of album covers based on your top last.fm albums.',
	other: {
		'darkreader-lock': 'darkreader-lock',
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<head>
				<ColorSchemeScript defaultColorScheme='dark' />
			</head>
			{/* <body className={inter.className}>{children}</body> */}
			<body>
				<MantineProvider defaultColorScheme='dark'>{children}</MantineProvider>
			</body>
		</html>
	);
}
