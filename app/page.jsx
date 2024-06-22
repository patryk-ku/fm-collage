import CollageCreator from '@/app/ui/CollageCreator';
import Footer from '@/app/ui/Footer';

export default function Home() {
	return (
		<div className='grid h-screen w-screen grid-rows-[1fr] md:grid-rows-[1fr_auto]'>
			<div className='grid justify-center p-1 md:content-center md:p-2'>
				<CollageCreator />
			</div>
			<Footer />
		</div>
	);
}
