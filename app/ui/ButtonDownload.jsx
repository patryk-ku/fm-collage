import { currentDateAsString } from '@/app/lib/utils';
import { Button } from '@mantine/core';
import { DownloadSimpleIcon } from '@phosphor-icons/react';

export default function ButtonDownload({ formValues, collage }) {
	const handleDownload = () => {
		const link = document.createElement('a');
		link.href = collage;
		let sizeString = '';
		if (formValues.current.size === 'custom') {
			sizeString = `${formValues.current.width}x${formValues.current.height}`;
		} else {
			sizeString = `${formValues.current.size}x${formValues.current.size}`;
		}
		link.download = `collage_${formValues.current.login}_${sizeString}_${formValues.current.time}_${currentDateAsString()}`;
		link.click();
		link.remove();
	};

	if (collage) {
		return (
			<Button
				variant='filled'
				color='download'
				leftSection={<DownloadSimpleIcon weight='bold' size={20} />}
				onClick={handleDownload}
			>
				Download
			</Button>
		);
	}
}
