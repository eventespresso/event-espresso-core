import { format, parse } from 'date-fns';

interface DateFormatter {
	formatDate: (date: Date) => string;
	parseDate: (str: string) => Date;
	placeholder: string;
}

const dateFormatter = (formatString: string): DateFormatter => ({
	formatDate: (date: Date): string => format(date, formatString),
	parseDate: (dateString: string): Date => parse(dateString, formatString, new Date()),
	placeholder: `${formatString} (moment)`,
});

export const FORMATS = {
	MYSQL: dateFormatter('yyyy-MM-dd HH:mm:ss'),
};
