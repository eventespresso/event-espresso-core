import { setHours, setMinutes, setSeconds, setYear, setMonth, setDate } from 'date-fns';

/**
 * Sets the time of the date oject to zero hour
 */
export const setTimeToZeroHour = (date: Date): Date => setSeconds(setMinutes(setHours(date, 0), 0), 0);

/**
 * Sets the date, month and year of the date object to those of today
 */
export const setDateToToday = (date: Date): Date => {
	const today = new Date();
	return setYear(setMonth(setDate(date, today.getDate()), today.getMonth()), today.getFullYear());
};
