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
