import moment from 'moment';

const momentFormatter = (format) => ({
	formatDate: (date) => moment(date).format(format),
	parseDate: (str) => moment(str, format).toDate(),
	placeholder: `${format} (moment)`,
});

export const FORMATS = {
	MYSQL: momentFormatter('YYYY-MM-DD HH:mm:ss'),
};
