import { defaultDateFormat, defaultTimeFormat } from '@appConstants/momentFormats';
import { parse } from 'date-fns';

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
	const formatStr = `${defaultDateFormat} ${defaultTimeFormat}`;

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
