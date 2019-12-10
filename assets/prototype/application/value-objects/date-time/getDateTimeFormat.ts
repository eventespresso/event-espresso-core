import { defaultDateFormat, defaultTimeFormat } from './defaults';

type getDateTimeFormatProps = {
	dateFormat?: string;
	timeFormat?: string;
};

const getDateTimeFormat = ({ dateFormat, timeFormat }: getDateTimeFormatProps) => {
	const format = dateFormat || defaultDateFormat + ' ' + timeFormat || defaultTimeFormat;

	return format;
};

export default getDateTimeFormat;
