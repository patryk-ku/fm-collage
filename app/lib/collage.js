'use client';
import { roboto_condensed } from '@/app/fonts';

async function fetchImage(url) {
	return new Promise((resolve) => {
		if (url.length === 0) {
			resolve({ error: 'Empty url' });
		}

		// TODO: Increase timemout value for bigger collages
		// timeout after 15 sec
		const timeoutId = setTimeout(() => {
			console.log(`The image took too long to load: ${url}`);
			resolve({ error: `The image took too long to load: ${url}` });
		}, 1000 * 15);

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

const canvasToImgUrl = (canvas, quality = 0.92) => {
	return new Promise((resolve, reject) => {
		canvas.toBlob(
			(blob) => {
				if (blob) {
					const url = URL.createObjectURL(blob);
					console.timeEnd('Canvas to blob');
					resolve(url);
				} else {
					console.timeEnd('Canvas to blob');
					reject(new Error('Conversion canvas to blob failed.'));
				}
			},
			'image/jpeg',
			quality
		);
	});
};

function drawTextWithBackground(context, text, x, y, fontHeight) {
	const textWidth = context.measureText(text).width;
	const backgroundWidth = textWidth > 280 ? 280 : textWidth;

	context.fillStyle = 'rgb(0 0 0 / 60%)';
	context.fillRect(x - 2, y - 4, backgroundWidth + 5, fontHeight + 3);

	context.fillStyle = 'white';
	context.fillText(text, x, y, 280);
}

export async function createCollage(data, settings) {
	console.time('Downloading cover images');
	const urls = data.album.map((album) => album.image[3]['#text']);
	const images = urls.map((url) => fetchImage(url));
	const covers = await Promise.all(images);
	console.timeEnd('Downloading cover images');

	const canvas = document.createElement('canvas');

	if (settings.size === 'custom') {
		canvas.width = Number(settings.width) * 300;
		canvas.height = Number(settings.height) * 300;
	} else {
		canvas.width = Number(settings.size) * 300;
		canvas.height = Number(settings.size) * 300;
	}
	const context = canvas.getContext('2d');

	const fontSize = 20;
	// context.font = '28px sans-serif';
	// context.font = '28px "Roboto Condensed", sans-serif';
	context.font = `${fontSize}px ${roboto_condensed.style.fontFamily}`;
	context.textBaseline = 'top';
	context.fillStyle = 'white';

	let x = 0,
		y = 0;

	console.time('Drawing canvas');
	for (let i = 0; i < covers.length; i++) {
		if (!covers[i].error) {
			context.drawImage(covers[i], x, y, 300, 300);
		}

		// TODO: responsive font size based on title/name length
		if (settings.playcount) {
			drawTextWithBackground(context, data.album[i].playcount, x + 8, y + 10, fontSize);
		}

		if (settings.artistname) {
			drawTextWithBackground(context, data.album[i].artist.name, x + 8, y + 244, fontSize);
		}

		if (settings.albumtitle) {
			drawTextWithBackground(context, data.album[i].name, x + 8, y + 272, fontSize);
		}

		x += 300;
		if (x == canvas.width) {
			x = 0;
			y += 300;
		}
	}
	console.timeEnd('Drawing canvas');

	// return canvas.toDataURL('image/jpeg');
	console.time('Canvas to blob');
	return await canvasToImgUrl(canvas);
}
