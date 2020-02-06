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
	Locale,
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

// only for calendarWeeks
type DirtyOptions = {
	locale?: Locale;
	weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};

const diff = (
	unit: UnitsType,
	dateLeft: Date | number,
	dateRight: Date | number,
	dirtyOptions?: DirtyOptions
): number => {
	const func = diffMapping[unit];

	return unit === 'calendarWeeks' ? func(dateLeft, dateRight, dirtyOptions) : func(dateLeft, dateRight);
};

export default diff;
