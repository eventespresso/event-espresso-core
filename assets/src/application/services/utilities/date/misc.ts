import { pipe } from 'ramda';
import { setHours, setMinutes, setSeconds, setYear, setMonth, setDate } from 'date-fns/fp';

/**
 * Sets the time of the date object to zero hour
 */
export const setTimeToZeroHour = (date: Date): Date => pipe(setHours(0), setMinutes(0), setSeconds(0))(date);

/**
 * Sets the date, month and year of the date object to those of today
 */
export const setDateToToday = (date: Date): Date => {
	const today = new Date();

	// prettier-ignore
	return pipe(
        setDate(today.getDate()),
        setMonth(today.getMonth()),
        setYear(today.getFullYear()
    ))(date);
};

/**
 * Sets the default time for a date based on `type`
 * Default time: 'start' => 8 am, 'end' => 5 pm
 */
export const setDefaultTime = (date: Date, type: 'start' | 'end' = 'start'): Date => {
	const hours = type === 'start' ? 8 : 17;
	return pipe(setHours(hours), setMinutes(0), setSeconds(0))(date);
};
