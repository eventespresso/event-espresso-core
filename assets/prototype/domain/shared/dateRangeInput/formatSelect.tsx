import moment from 'moment';

interface MomentFormatter {
	formatDate: (date: Date) => string;
	parseDate: (str: string) => Date;
	placeholder: string;
}

const momentFormatter = (format: string): MomentFormatter => ({
	formatDate: (date: Date): string => moment(date).format(format),
	parseDate: (str: string): Date => moment(str, format).toDate(),
	placeholder: `${format} (moment)`,
});

export const FORMATS = {
	MYSQL: momentFormatter('YYYY-MM-DD HH:mm:ss'),
};
