export function currentDateAsString() {
	const date = new Date();
	const month = `${date.getMonth() + 1}`.padStart(2, '0');
	const day = `${date.getDate()}`.padStart(2, '0');
	const parsedDate = `${date.getFullYear()}-${month}-${day}`;
	return parsedDate;
}
