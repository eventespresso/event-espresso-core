/**
 * object where keys are WordPress date format parameters
 * and values are substitutions required to work with react-date-picker
 */
const dateFormats = {
	Y: 'y',
	M: 'MMM',
	n: 'M',
	m: 'MM',
	F: 'MMMM',
	j: 'd',
	s: '',
	l: '',
	D: '',
};

/**
 * object where keys are WordPress time format parameters
 * and values are substitutions required to work with react-time-picker
 */
const timeFormats = {
	H: 'HH',
	G: 'H',
	h: 'hh',
	g: 'h',
	i: 'mm',
	A: 'a',
};

/**
 * converts WordPress date formats to work with react-date-picker
 */
export const convertWordPressDateFormat = (dateFormat: string) => {
	let newFormat = dateFormat;
	for (const find in dateFormats) {
		if (dateFormats.hasOwnProperty(find)) {
			const replace = dateFormats[find];
			newFormat = newFormat.replace(find, replace);
		}
	}
	return newFormat;
};

/**
 * converts WordPress time formats to work with react-time-picker
 */
export const convertWordPressTimeFormat = (timeFormat: string) => {
	const is12HourTime = timeFormat.indexOf('g') !== -1 || timeFormat.indexOf('h') !== -1;
	let newFormat = timeFormat;
	for (const find in timeFormats) {
		if (timeFormats.hasOwnProperty(find)) {
			const replace = timeFormats[find];
			newFormat = newFormat.replace(find, replace);
		}
	}
	const hasAMPM = newFormat.indexOf('a') !== -1;
	// make sure am/pm is added back in for 12 hour time formats
	return is12HourTime && !hasAMPM ? `${newFormat} a` : newFormat;
};
