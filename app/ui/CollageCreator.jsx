'use client';
import CollageImage from '@/app/ui/CollageImage';
import Form from '@/app/ui/Form';
import { useState } from 'react';

import { Text, Title } from '@mantine/core';

export default function CollageCreator() {
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [collage, setCollage] = useState(null);

	return (
		<div className='grid grid-cols-[96vw] gap-8 sm:max-w-[1000px] sm:items-center md:grid-cols-[min-content_1fr] md:gap-12'>
			<div className='flex select-none flex-col justify-center gap-8'>
				<div className='text-center'>
					<Title order={1}>
						<Text span inherit c='submit'>
							.fm
						</Text>{' '}
						<Text span inherit c='primary.6'>
							Collage
						</Text>{' '}
						<Text span inherit c='submit'>
							Creator
						</Text>{' '}
						{/* <Text
							span
							inherit
							variant='gradient'
							gradient={{ from: 'submit.6', to: 'primary.5', deg: 94 }}
						>
							Collage Creator
						</Text> */}
					</Title>
				</div>
				<Form
					loadingProps={{ loading, setLoading }}
					collageProps={{ collage, setCollage }}
					setErrorMessage={setErrorMessage}
				/>
			</div>
			<CollageImage loading={loading} collage={collage} errorMessage={errorMessage} />
		</div>
	);
}
