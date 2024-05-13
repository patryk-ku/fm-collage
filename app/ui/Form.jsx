'use client';
import { useRef } from 'react';
import { Text, TextInput, SegmentedControl, Chip, Button } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { DownloadSimple } from '@phosphor-icons/react';
import { getTopAlbums } from '@/app/lib/lastfm';
import { createCollage } from '@/app/lib/collage';
import { currentDateAsString } from '@/app/lib/utils';

export default function Form({ loadingProps, collageProps, setErrorMessage }) {
	const { loading, setLoading } = loadingProps;
	const { collage, setCollage } = collageProps;
	const formValues = useRef(null);

	const form = useForm({
		mode: 'uncontrolled',
		initialValues: {
			login: '',
			size: '3',
			time: '7day',
			playcount: false,
			albumtitle: false,
			artistname: false,
		},
		validate: {
			login: hasLength({ min: 2 }, 'Must be at least 2 characters'),
		},
	});

	const handleSubmit = async (event) => {
		event.preventDefault();
		setCollage(null);
		setErrorMessage(null);
		formValues.current = null;

		if (!form.isValid()) {
			form.validate();
			setLoading(false);
			return;
		}

		setLoading(true);
		formValues.current = form.getValues();

		// fetch data from last.fm api
		const topAlbums = await getTopAlbums(formValues.current);
		if (topAlbums.error) {
			setErrorMessage(topAlbums.error);
			setLoading(false);
			return;
		}

		// create collage using canvas
		try {
			const image = await createCollage(topAlbums, formValues.current);
			setCollage(image);
		} catch (error) {
			setErrorMessage(error);
			console.log(error);
		}
		setLoading(false);
	};

	const handleDownload = () => {
		const link = document.createElement('a');
		link.href = collage;
		link.download = `collage_${formValues.current.login}_${formValues.current.size}x${formValues.current.size}_${formValues.current.time}_${currentDateAsString()}`;
		link.click();
		link.remove();
	};

	return (
		<form className='flex flex-col gap-3' onSubmit={handleSubmit}>
			<TextInput
				variant='filled'
				radius='md'
				label='Login'
				placeholder='Last.fm login'
				disabled={loading}
				key={form.key('login')}
				{...form.getInputProps('login')}
				// Custom styles for inline error with label (prevents layout shift after error)
				styles={{
					root: {
						display: 'grid',
						gridTemplateColumns: 'auto 1fr',
						alignItems: 'baseline',
					},
					description: {
						order: 1,
					},
					label: {
						order: -2,
						marginBottom: '2px',
					},
					error: {
						order: -2,
						justifySelf: 'end',
					},
					wrapper: {
						gridColumn: '1 / span 2',
						marginBottom: 0,
					},
				}}
			/>
			<div>
				<Text size='sm' fw={500} mb={3}>
					Size
				</Text>
				<SegmentedControl
					withItemsBorders={false}
					fullWidth
					size='xs'
					radius='md'
					color='violet'
					disabled={loading}
					key={form.key('size')}
					{...form.getInputProps('size')}
					data={[
						{
							value: '3',
							label: '3 x 3',
						},
						{
							value: '4',
							label: '4 x 4',
						},
						{
							value: '5',
							label: '5 x 5',
						},
						{
							value: '10',
							label: '10 x 10',
						},
						{
							value: '15',
							label: '15 x 15',
						},
						{
							value: '20',
							label: '20 x 20',
						},
						{
							value: 'custom',
							label: 'custom',
							disabled: true,
						},
					]}
				/>
			</div>

			<div>
				<Text size='sm' fw={500} mb={3}>
					Time
				</Text>
				<SegmentedControl
					withItemsBorders={false}
					fullWidth
					size='xs'
					radius='md'
					color='violet'
					disabled={loading}
					key={form.key('time')}
					{...form.getInputProps('time')}
					data={[
						{
							value: '7day',
							label: 'week',
						},
						{
							value: '1month',
							label: 'month',
						},
						{
							value: '3month',
							label: '3 months',
						},
						{
							value: '6month',
							label: '6 months',
						},
						{
							value: '12month',
							label: 'year',
						},
						{
							value: 'overall',
							label: 'overall',
						},
					]}
				/>
			</div>

			<div>
				<Text size='sm' fw={500} mb={3}>
					Captions
				</Text>
				<div className='flex flex-wrap gap-2 sm:flex-nowrap'>
					<Chip
						color='violet'
						// size='xs'
						radius='lg'
						key={form.key('playcount')}
						{...form.getInputProps('playcount')}
					>
						playcount
					</Chip>
					<Chip
						color='violet'
						// size='xs'
						radius='lg'
						key={form.key('albumtitle')}
						{...form.getInputProps('albumtitle')}
					>
						album title
					</Chip>
					<Chip
						color='violet'
						// size='xs'
						radius='lg'
						key={form.key('artistname')}
						{...form.getInputProps('artistname')}
					>
						artist name
					</Chip>
				</div>
			</div>

			<div className='mt-4 flex flex-row-reverse items-center gap-3'>
				{/* TODO: add copy image button */}
				<Button type='submit' variant='filled' color='indigo' radius='md' loading={loading}>
					Create Collage
				</Button>
				{collage && (
					<Button
						variant='filled'
						color='green'
						radius='md'
						leftSection={<DownloadSimple weight='bold' size={20} />}
						onClick={handleDownload}
					>
						Download
					</Button>
				)}
			</div>
		</form>
	);
}
