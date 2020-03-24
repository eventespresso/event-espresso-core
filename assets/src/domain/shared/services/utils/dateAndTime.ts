import { CONVERT_TO_MOMENT_DATE_FORMAT, CONVERT_TO_MOMENT_TIME_FORMAT } from '@appConstants/dateFnsFormats';
import { formatISO, isValid, parse, parseISO } from 'date-fns';
import { __ } from '@wordpress/i18n';
import * as yup from 'yup';

export interface DateAndTime {
	startDate?: string;
	startTime?: string;
	endDate?: string;
	endTime?: string;
}

interface StartAndEndDate {
	startDate: Date;
	endDate: Date;
}

type ProcessDateAndTime = (dateTime: DateAndTime, backupDate?: Date) => StartAndEndDate;

export const processDateAndTime: ProcessDateAndTime = (dateTime, backupDate = new Date()) => {
	let startDate: Date, endDate: Date;
	const formatStr = `${CONVERT_TO_MOMENT_DATE_FORMAT} ${CONVERT_TO_MOMENT_TIME_FORMAT}`;

	if (dateTime.startDate && dateTime.startTime) {
		const startDateStr = `${dateTime.startDate} ${dateTime.startTime}`;
		startDate = parse(startDateStr, formatStr, backupDate);
	}

	if (dateTime.endDate && dateTime.endTime) {
		const endDateStr = `${dateTime.endDate} ${dateTime.endTime}`;
		endDate = parse(endDateStr, formatStr, backupDate);
	}
	return { startDate, endDate };
};

const transformDateTime = (value: any, originalValue: any, format: string): Date => {
	if (!value) {
		return value;
	}
	const validValue = value instanceof Date && !isValid(value) ? originalValue : value;
	return validValue instanceof Date ? validValue : parse(validValue, format, new Date());
};
const transformDate = (value: any, originalValue: any): Date => {
	return transformDateTime(value, originalValue, CONVERT_TO_MOMENT_DATE_FORMAT);
};
const transformTime = (value: any, originalValue: any): Date => {
	return transformDateTime(value, originalValue, CONVERT_TO_MOMENT_TIME_FORMAT);
};

export const dateAndTimeSchema = yup.object({
	startDate: yup
		.date()
		.transform(transformDate) // make sure we have Date object
		.required(() => __('Start Date is required')),
	startTime: yup
		.date()
		.transform(transformTime)
		.required(() => __('Start Time is required')),
	endDate: yup
		.date()
		.transform(transformDate)
		.required(() => __('End Date is required'))
		.when(['startDate'], (startDate: Date, schema: yup.DateSchema) => {
			return schema.min(startDate, () => __('End Date & Time must be set later than the Start Date & Time'));
		}),
	endTime: yup
		.date()
		.transform(transformTime)
		.required(() => __('End Time is required'))
		.when(
			['startDate', 'startTime', 'endDate'],
			(startDate: Date, startTime: Date, endDate: Date, schema: yup.DateSchema) => {
				if (startDate && startTime && endDate) {
					// if end and start is on the same DAY
					if (startDate.getDate() === endDate.getDate()) {
						// make start time to be the min limit foe end time
						return schema.min(startTime, () =>
							__('End Date & Time must be set later than the Start Date & Time')
						);
					}
				}
				return schema;
			}
		),
});

export const now = parseISO(formatISO(new Date()));

export const prepareDateForForm = (mayBeDate: any, defaultDate: Date): Date => {
	if (mayBeDate) {
		return mayBeDate instanceof Date ? mayBeDate : parseISO(mayBeDate);
	}
	return defaultDate;
};
