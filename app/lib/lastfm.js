'use server';
import 'dotenv/config';

// TODO: rate limit
export async function getTopAlbums(args) {
	const login = encodeURIComponent(args.login);
	const time = encodeURIComponent(args.time);
	const size = Number(encodeURIComponent(args.size));
	const limit = size * size;

	let topAlbums;
	try {
		topAlbums = await fetch(
			`https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${login}&api_key=${process.env.LASTFM_API_KEY}&format=json&limit=${limit}&period=${time}`
		)
			.then((res) => {
				if (!res.ok) {
					if (res.status === 404) {
						throw 'User not found.';
					}
					throw `Error during data fetching: ${res.statusText}.`;
				}
				return res;
			})
			.then((res) => res.json())
			.catch((error) => {
				throw new Error(error);
			});
	} catch (error) {
		return { error: error.message };
	}

	if (topAlbums.error) {
		if (topAlbums.error == 6) {
			return { error: 'User not found.' };
		} else {
			return { error: 'Unknown last.fm API error. Try again later.' };
		}
	}

	const errorMessage =
		'No data available for the specified user. The user has probably not scrobbled any albums in the time range specified.';

	if (!topAlbums.topalbums) {
		return { error: errorMessage };
	}

	if (!topAlbums.topalbums.album[0]) {
		return { error: errorMessage };
	}

	if (topAlbums.topalbums.album.length == 0) {
		return { error: errorMessage };
	}

	if (topAlbums.topalbums['@attr'].total == '0') {
		return { error: errorMessage };
	}

	return topAlbums.topalbums;
}
