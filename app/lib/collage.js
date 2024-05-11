'use client';

async function fetchImage(url) {
	return new Promise((resolve) => {
		if (url.length === 0) {
			resolve({ error: 'Empty url' });
		}

		// timeout after 10 sec
		const timeoutId = setTimeout(() => {
			console.log(`The image took too long to load: ${url}`);
			resolve({ error: `The image took too long to load: ${url}` });
		}, 1000 * 10);

		const image = new Image();
		// CORS:
		image.crossOrigin = 'Anonymous';

		image.onload = () => {
			clearTimeout(timeoutId);
			resolve(image);
		};
		image.onerror = () => {
			clearTimeout(timeoutId);
			resolve({ error: `Could not load image at ${url}` });
		};

		image.src = url;
	});
}

export async function createCollage(data, size) {
	const urls = data.album.map((album) => album.image[3]['#text']);
	const images = urls.map((url) => fetchImage(url));

	const covers = await Promise.all(images);

	const canvas = document.createElement('canvas');
	canvas.width = Number(size) * 300;
	canvas.height = Number(size) * 300;
	const context = canvas.getContext('2d');

	let x = 0,
		y = 0;

	for (const cover of covers) {
		if (!cover.error) {
			context.drawImage(cover, x, y, 300, 300);
		}

		x += 300;
		if (x == canvas.width) {
			x = 0;
			y += 300;
		}
	}

	return canvas.toDataURL('image/jpeg');
}
