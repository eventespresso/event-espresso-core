import {
	MOMENT_DATE_FORMAT,
	MOMENT_TIME_FORMAT,
	DEFAULT_DATE_FORMAT,
	DEFAULT_TIME_FORMAT,
} from '@appConstants/dateFnsFormats';
import {
	formatISO,
	isValid,
	parse,
	parseISO,
	format,
	getYear,
	getMonth,
	getDate,
	setYear,
	setMonth,
	setDate,
} from 'date-fns';
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
	const formatStr = `${DEFAULT_DATE_FORMAT} ${DEFAULT_TIME_FORMAT}`;

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
	return transformDateTime(value, originalValue, MOMENT_DATE_FORMAT);
};
const transformTime = (value: any, originalValue: any): Date => {
	return transformDateTime(value, originalValue, MOMENT_TIME_FORMAT);
};

/**
 * sets year, month and date for a time value from the given date object.
 */
export const updateTimeFromDate = (time: Date, date: Date): Date => {
	// clone to avoid mutating the actual object
	let newTime = setYear(time, getYear(date));
	newTime = setMonth(newTime, getMonth(date));
	newTime = setDate(newTime, getDate(date));
	return newTime;
};

export const transformTimeByDate: yup.WhenOptionsBuilderFunction<yup.DateSchema> = (
	date: Date,
	schema: yup.DateSchema
) => {
	// if the date is valid
	if (isValid(date)) {
		// transform the time to set year month and date from adjacent date input
		return schema.transform((value) => {
			return isValid(value) ? updateTimeFromDate(value, date) : value;
		});
	}
	// otherwise return the original schema
	return schema;
};
export const dateErrorMessage = (): string => __('End Date & Time must be set later than the Start Date & Time');

export const dateAndTimeSchema = yup.object({
	startDate: yup
		.date()
		.transform(transformDate) // make sure we have Date object
		.required(() => __('Start Date is required')),
	startTime: yup
		.date()
		.transform(transformTime)
		.required(() => __('Start Time is required'))
		.when('startDate', transformTimeByDate),
	endDate: yup
		.date()
		.transform(transformDate)
		.required(() => __('End Date is required'))
		.when(['startDate'], (startDate: Date, schema: yup.DateSchema) => {
			return schema.min(startDate, dateErrorMessage);
		}),
	endTime: yup
		.date()
		.transform(transformTime)
		.required(() => __('End Time is required'))
		.when(['startTime', 'endDate'], (startTime: Date, endDate: Date, schema: yup.DateSchema) => {
			return transformTimeByDate(endDate, schema).min(startTime, dateErrorMessage);
		}),
});

export const now = parseISO(formatISO(new Date()));
