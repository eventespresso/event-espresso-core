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
} from 'date-fns';

const intervalMapping = {
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

const add = (date, interval, amount) => {
	const func = intervalMapping[interval];
	return func(date, amount);
};

export default add;
