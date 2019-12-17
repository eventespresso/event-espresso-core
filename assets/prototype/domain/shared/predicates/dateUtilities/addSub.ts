import {
	addDays,
	addHours,
	addISOWeekYears,
	addMilliseconds,
	addMinutes,
	addMonths,
	addQuarters,
	addSeconds,
	addWeeks,
	addYears,
	toDate,
} from 'date-fns';

import { toInteger } from '../../../../application/utilities/converters/number';

type IntervalType =
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

const addMapping = {
	days: addDays,
	hours: addHours,
	ISOWeekYears: addISOWeekYears,
	milliseconds: addMilliseconds,
	minutes: addMinutes,
	months: addMonths,
	quarters: addQuarters,
	seconds: addSeconds,
	weeks: addWeeks,
	years: addYears,
};

export const add = (interval: IntervalType, date: Date, amount: number) => {
	const func = addMapping[interval];
	return func(date, amount);
};

export const sub = (interval: IntervalType, dirtyDate: Date, dirtyAmount: number) => {
	const func = addMapping[interval];
	const amount = toInteger(dirtyAmount);
	const date = toDate(dirtyDate);

	return func(date, -amount);
};
