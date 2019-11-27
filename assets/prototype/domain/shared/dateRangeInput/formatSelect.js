import moment from 'moment';

export const FORMATS = [
	momentFormatter('YYYY-MM-DD HH:mm:ss'),
	{
		formatDate: (date) => (date == null ? '' : date.toLocaleDateString()),
		parseDate: (str) => new Date(Date.parse(str)),
		placeholder: 'JS Date',
	},
	momentFormatter('MM/DD/YYYY'),
	momentFormatter('YYYY-MM-DD'),
	momentFormatter('YYYY-MM-DD HH:mm:ss'),
];

function momentFormatter(format) {
	return {
		formatDate: (date) => moment(date).format(format),
		parseDate: (str) => moment(str, format).toDate(),
		placeholder: `${format} (moment)`,
	};
}
