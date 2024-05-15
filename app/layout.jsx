import './globals.css';
import '@mantine/core/styles.css';

import { createTheme, ColorSchemeScript, MantineProvider } from '@mantine/core';

export const metadata = {
	title: '.fm collage creator',
	description: 'Create collage of album covers based on your top last.fm albums.',
	other: {
		'darkreader-lock': 'darkreader-lock',
	},
};

const theme = createTheme({
	primaryColor: 'primary',
	// primaryShade: 7,
	defaultRadius: 'md',
	// https://coolors.co/22223b-007fff-51e5ff-dc136c
	colors: {
		dark: [
			'#efeff6',
			'#cecee3',
			'#aeaed0',
			'#8e8ebe',
			'#6d6dab',
			'#545492',
			'#414171',
			'#2f2f51',
			'#1c1c31',
			'#090910',
		],
		// 	dark: [
		// 		'#f0f1f5',
		// 		'#d1d4e0',
		// 		'#b3b7cb',
		// 		'#959ab7',
		// 		'#767ea2',
		// 		'#5d6489',
		// 		'#484e6a',
		// 		'#34384c',
		// 		'#1f212e',
		// 		'#0a0b0f',
		// 	],
		primary: [
			'#dfffff',
			'#caf9ff',
			'#9af0ff',
			'#64e8ff',
			'#3de1fe',
			'#25dcfe',
			'#09daff',
			'#00c1e4',
			'#00accc',
			'#0095b3',
		],
		submit: [
			'#ffe9f6',
			'#fdd2e6',
			'#f7a3c8',
			'#f272aa',
			'#ed4991',
			'#eb2e80',
			'#ea2078',
			'#d11267',
			'#bb075b',
			'#a5004e',
		],
		download: [
			'#e3f6ff',
			'#cde7ff',
			'#9bcdff',
			'#64b1ff',
			'#3a9afe',
			'#1f8bfe',
			'#0984ff',
			'#0071e4',
			'#0064cd',
			'#0056b5',
		],
	},
});

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<head>
				<ColorSchemeScript defaultColorScheme='dark' />
			</head>
			<body>
				<MantineProvider defaultColorScheme='dark' theme={theme}>
					{children}
				</MantineProvider>
			</body>
		</html>
	);
}
