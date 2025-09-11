'use client';
import { Alert, Image, Skeleton } from '@mantine/core';
import { WarningCircleIcon } from '@phosphor-icons/react';

export default function CollageImage({ loading, collage, errorMessage }) {
	if (collage) {
		return (
			<Image
				className='md:h-[490px] md:max-h-[90vh]'
				radius='md'
				src={collage}
				alt=''
				w='auto'
				h='auto'
				fit='contain'
			/>
		);
	} else if (errorMessage) {
		return (
			<div className='grid aspect-square w-full justify-items-stretch border-red md:h-[592px]'>
				<Alert
					variant='light'
					color='pink'
					radius='md'
					title='Error'
					icon={<WarningCircleIcon size={18} weight='bold' />}
					styles={{
						root: {
							width: '100%',
							display: 'grid',
							alignItems: 'center',
							justifyContent: 'center',
						},
					}}
				>
					{errorMessage}
				</Alert>
			</div>
		);
	} else {
		return (
			<Skeleton animate={loading} radius='md'>
				<div className='aspect-square w-full md:h-[592px]'></div>
			</Skeleton>
		);
	}
}
