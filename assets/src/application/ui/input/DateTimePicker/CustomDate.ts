import {
	getDay as getWeekDay,
	getSeconds as getSecond,
	getMinutes as getMinute,
	getHours as getHour,
	getDate,
	getMonth,
	getYear,
	addYears as addYear,
	addMonths as addMonth,
	addDays as addDate,
	setYear,
	setMonth,
	setDate,
	setHours as setHour,
	setMinutes as setMinute,
	setSeconds as setSecond,
	isAfter,
	isValid as isValidate,
	getWeek,
	format,
	parse,
} from 'date-fns';
import { enUS } from 'date-fns/locale';
import { GenerateConfig } from 'rc-picker/lib/generate/index';

const CustomDate: GenerateConfig<Date> = {
	getWeekDay,
	getSecond,
	getMinute,
	getHour,
	getDate,
	getMonth,
	getYear,
	getNow: () => new Date(),
	addYear,
	addMonth,
	addDate,
	setYear,
	setMonth,
	setDate,
	setHour,
	setMinute,
	setSecond,
	isAfter,
	isValidate,
	locale: {
		getWeekFirstDay: (locale: string) => 0,
		getWeek: (locale: string, value) => getWeek(value, { locale: { code: locale, ...enUS } }),
		format: (locale: string, date, formatStr: string) => {
			// convert moment format to date-fns format
			return format(date, formatString, { locale: { code: locale, ...enUS } });
		},
		/** Should only return validate date instance */
		parse: (locale: string, text: string, formats: string[]) => {
			return text && parse(text, formats[0], new Date(), { locale: { code: locale, ...enUS } });
		},
		/**
		 * @todo localize the week and month names
		 */
		getShortWeekDays: (locale: string) => ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
		getShortMonths: (locale: string) => [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		],
	},
};

export default CustomDate;
