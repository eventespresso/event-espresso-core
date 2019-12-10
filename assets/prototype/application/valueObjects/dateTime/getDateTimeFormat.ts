import { defaultDateFormat, defaultTimeFormat } from './defaults';

type getDateTimeFormatProps = {
	dateFormat?: string;
	timeFormat?: string;
};

const getDateTimeFormat = (props: getDateTimeFormatProps) => {
	const dateFormat = props.dateFormat || defaultDateFormat;
	const timeFormat = props.timeFormat || defaultTimeFormat;
	const dateTimeFormat = dateFormat + ' ' + timeFormat;

	return {
		dateFormat,
		dateTimeFormat,
		timeFormat,
	};
};

export default getDateTimeFormat;
