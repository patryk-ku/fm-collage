'use client';
import {
	MantineProvider,
	Switch,
	createTheme,
	useComputedColorScheme,
	useMantineColorScheme,
} from '@mantine/core';
import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import Cookies from 'js-cookie';

export default function ThemeSwitch() {
	const { setColorScheme } = useMantineColorScheme({ keepTransitions: true });
	const computedColorScheme = useComputedColorScheme('light');
	Cookies.set('theme', computedColorScheme, { expires: 365 });

	const toggleTheme = () => {
		const newTheme = computedColorScheme === 'dark' ? 'light' : 'dark';
		setColorScheme(newTheme);
		Cookies.set('theme', newTheme, { expires: 365 });
	};

	const theme = createTheme({
		cursorType: 'pointer',
	});

	return (
		<div>
			<MantineProvider theme={theme}>
				<Switch
					size='sm'
					color='blue'
					onLabel={
						<SunIcon
							size={16}
							weight='fill'
							className='text-(--mantine-color-yellow-4)'
						/>
					}
					offLabel={
						<MoonIcon
							size={16}
							weight='fill'
							className='text-(--mantine-color-indigo-4)'
						/>
					}
					checked={computedColorScheme === 'dark' ? false : true}
					onClick={toggleTheme}
					withThumbIndicator={false}
				/>
			</MantineProvider>
		</div>
	);
}
