'use client';
import { useRef } from 'react';
import { Text, TextInput, SegmentedControl, NumberInput, Chip, Button } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { useLocalStorage, readLocalStorageValue } from '@mantine/hooks';
import { DownloadSimple } from '@phosphor-icons/react';
import { getTopAlbums } from '@/app/lib/lastfm';
import { createCollage } from '@/app/lib/collage';
import { currentDateAsString } from '@/app/lib/utils';

export default function Form({ loadingProps, collageProps, setErrorMessage }) {
	const { loading, setLoading } = loadingProps;
	const { collage, setCollage } = collageProps;
	const formValues = useRef(null);
	const [, setLocalLogin] = useLocalStorage({
		key: 'lastfm-login',
		defaultValue: '',
	});

	const form = useForm({
		mode: 'controlled',
		initialValues: {
			login: readLocalStorageValue({ key: 'lastfm-login' }),
			size: '3',
			time: '7day',
			height: '',
			width: '',
			playcount: false,
			albumtitle: false,
			artistname: false,
		},
		validate: {
			login: hasLength({ min: 2 }, 'Must be at least 2 characters'),
			height: (value, values) => (values.size === 'custom' && value < 1 ? 'min 1' : null),
			width: (value, values) => (values.size === 'custom' && value < 1 ? 'min 1' : null),
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

		console.time('Total');
		console.group('New Collage');
		setLoading(true);
		formValues.current = form.getValues();
		setLocalLogin(formValues.current.login);

		// fetch data from last.fm api
		console.time('Fetching data from API');
		const topAlbums = await getTopAlbums(formValues.current);
		if (topAlbums.error) {
			setErrorMessage(topAlbums.error);
			setLoading(false);
			console.timeEnd('Fetching data from API');
			console.groupEnd('New Collage');
			return;
		}
		console.timeEnd('Fetching data from API');

		// create collage using canvas
		try {
			const image = await createCollage(topAlbums, formValues.current);
			setCollage(image);
		} catch (error) {
			setErrorMessage(error);
			console.log(error);
		}
		setLoading(false);
		console.timeEnd('Total');
		console.groupEnd('New Collage');
	};

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

	const customInputStyles = {
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
	};

	return (
		<form className='flex flex-col gap-3' onSubmit={handleSubmit}>
			<TextInput
				variant='filled'
				label='Login'
				placeholder='Last.fm login'
				disabled={loading}
				key={form.key('login')}
				{...form.getInputProps('login')}
				// Custom styles for inline error with label (prevents layout shift after error)
				styles={customInputStyles}
			/>

			<div>
				<Text size='sm' fw={500} mb={3}>
					Size
				</Text>
				<SegmentedControl
					withItemsBorders={false}
					fullWidth
					size='xs'
					color='primary'
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
						},
					]}
				/>
				{form.values.size === 'custom' && (
					<div className='mt-2 grid grid-cols-2 gap-2'>
						<NumberInput
							variant='filled'
							label='Width'
							placeholder='max 30'
							allowNegative={false}
							allowDecimal={false}
							min={1}
							max={30}
							disabled={loading}
							key={form.key('width')}
							{...form.getInputProps('width')}
							styles={customInputStyles}
						/>
						<NumberInput
							variant='filled'
							label='Height'
							placeholder='max 30'
							allowNegative={false}
							allowDecimal={false}
							min={1}
							max={30}
							disabled={loading}
							key={form.key('height')}
							{...form.getInputProps('height')}
							styles={customInputStyles}
						/>
					</div>
				)}
			</div>

			<div>
				<Text size='sm' fw={500} mb={3}>
					Time
				</Text>
				<SegmentedControl
					withItemsBorders={false}
					fullWidth
					size='xs'
					color='primary'
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
				<div className='flex flex-wrap gap-2 sm:min-w-[360px] sm:flex-nowrap md:justify-between'>
					<Chip
						// size='xs'
						// variant='light'
						key={form.key('playcount')}
						disabled={loading}
						{...form.getInputProps('playcount')}
					>
						playcount
					</Chip>
					<Chip
						key={form.key('albumtitle')}
						disabled={loading}
						{...form.getInputProps('albumtitle')}
					>
						album title
					</Chip>
					<Chip
						key={form.key('artistname')}
						disabled={loading}
						{...form.getInputProps('artistname')}
					>
						artist name
					</Chip>
				</div>
			</div>

			<div className='mt-4 flex flex-row-reverse items-center gap-3'>
				{/* TODO: add copy image button */}
				<Button type='submit' variant='filled' color='submit.7' loading={loading}>
					Create Collage
				</Button>
				{collage && (
					<Button
						variant='filled'
						color='download.7'
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
