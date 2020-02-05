import {
	differenceInBusinessDays,
	differenceInCalendarDays,
	differenceInCalendarISOWeekYears,
	differenceInCalendarISOWeeks,
	differenceInCalendarMonths,
	differenceInCalendarQuarters,
	differenceInCalendarWeeks,
	differenceInCalendarYears,
	differenceInDays,
	differenceInHours,
	differenceInISOWeekYears,
	differenceInMilliseconds,
	differenceInMinutes,
	differenceInMonths,
	differenceInQuarters,
	differenceInSeconds,
	differenceInWeeks,
	differenceInYears,
} from 'date-fns';

type UnitsType =
	| 'businessDays'
	| 'calendarDays'
	| 'calendarISOWeekYears'
	| 'calendarISOWeeks'
	| 'calendarMonths'
	| 'calendarQuarters'
	| 'calendarWeeks'
	| 'calendarYears'
	| 'days'
	| 'hours'
	| 'ISOWeekYears'
	| 'milliseconds'
	| 'minutes'
	| 'months'
	| 'quarters'
	| 'seconds'
	| 'weeks'
	| 'years';

const diffMapping = {
	businessDays: differenceInBusinessDays,
	calendarDays: differenceInCalendarDays,
	calendarISOWeekYears: differenceInCalendarISOWeekYears,
	calendarISOWeeks: differenceInCalendarISOWeeks,
	calendarMonths: differenceInCalendarMonths,
	calendarQuarters: differenceInCalendarQuarters,
	calendarWeeks: differenceInCalendarWeeks,
	calendarYears: differenceInCalendarYears,
	days: differenceInDays,
	hours: differenceInHours,
	ISOWeekYears: differenceInISOWeekYears,
	milliseconds: differenceInMilliseconds,
	minutes: differenceInMinutes,
	months: differenceInMonths,
	quarters: differenceInQuarters,
	seconds: differenceInSeconds,
	weeks: differenceInWeeks,
	years: differenceInYears,
};

const diff = (unit: UnitsType, dateLeft: Date | number, dateRight: Date | number) => {
	const func = diffMapping[unit];

	return func(dateLeft, dateRight);
};

export default diff;
