import ThemeSwitch from '@/app/ui/ThemeSwitch';
import { Button, Text } from '@mantine/core';
import { GithubLogo } from '@phosphor-icons/react/dist/ssr';

export default function Footer() {
	return (
		<footer className='flex flex-row items-center justify-center gap-4 pb-1'>
			<Text size='xs' fw={500}>
				Patryk Kurdziel © 2024-2025
			</Text>
			<Button
				component='a'
				radius='lg'
				variant='default'
				size='compact-xs'
				leftSection={<GithubLogo weight='fill' size={14} />}
				href='https://github.com/patryk-ku/fm-collage'
				target='_blank'
			>
				GitHub
			</Button>
			<ThemeSwitch />
		</footer>
	);
}
