import {
	CONVERT_TO_MOMENT_DATE_FORMAT,
	CONVERT_TO_MOMENT_TIME_FORMAT,
	DEFAULT_DATE_FORMAT,
	DEFAULT_TIME_FORMAT,
} from '@appConstants/dateFnsFormats';
import { formatISO, isValid, parse, parseISO, format } from 'date-fns';
import { __ } from '@wordpress/i18n';
import * as yup from 'yup';

interface StartAndEndDate {
	startDate: string | Date;
	endDate: string | Date;
}

export interface DateAndTime extends Partial<StartAndEndDate> {
	startTime?: string | Date;
	endTime?: string | Date;
}

type ProcessDateAndTime = (
	dateTime: DateAndTime,
	siteTimeToUtc: (date: Date) => Date,
	backupDate?: Date
) => StartAndEndDate;

export const processDateAndTime: ProcessDateAndTime = (dateTime, siteTimeToUtc, backupDate = new Date()) => {
	let startDate: string, endDate: string;
	const formatStr = `${CONVERT_TO_MOMENT_DATE_FORMAT} ${CONVERT_TO_MOMENT_TIME_FORMAT}`;

	if (dateTime.startDate && dateTime.startTime) {
		const startDateStr = `${format(dateTime.startDate as Date, DEFAULT_DATE_FORMAT)} ${format(
			dateTime.startTime as Date,
			DEFAULT_TIME_FORMAT
		)}`;
		startDate = siteTimeToUtc(parse(startDateStr, formatStr, backupDate)).toISOString();
	}

	if (dateTime.endDate && dateTime.endTime) {
		const endDateStr = `${format(dateTime.endDate as Date, DEFAULT_DATE_FORMAT)} ${format(
			dateTime.endTime as Date,
			DEFAULT_TIME_FORMAT
		)}`;
		endDate = siteTimeToUtc(parse(endDateStr, formatStr, backupDate)).toISOString();
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
