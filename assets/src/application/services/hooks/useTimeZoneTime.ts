import { path } from 'ramda';
import { format as formatDate, parseISO, isValid } from 'date-fns';

import useConfig from '../config/useConfig';
import { localToUtc, utcToLocal } from '../utilities/date';

type DateFn = (date: Date | string | number) => Date;
type FormatDateFn = (date: Date, options?: Intl.DateTimeFormatOptions) => string;

interface TimeZoneTime {
	formatDateForSite: FormatDateFn;
	formatDateForUser: FormatDateFn;
	formatUtcDateForSite: FormatDateFn;
	formatUtcDateForUser: FormatDateFn;
	localTimeToUtc: DateFn;
	utcToLocalTime: DateFn;
}

const deafultOptions: Intl.DateTimeFormatOptions = {
	weekday: 'long',
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric',
	hour12: true,
	timeZoneName: 'long',
};

const useTimeZoneTime = (): TimeZoneTime => {
	const config = useConfig();
	// locale and timezone for the site
	const siteLC = path<string>(['locale', 'site'], config);
	const siteTZ = path<string>(['timezone', 'name'], config);
	// locale and timezone for the user
	const userLC = path<string>(['locale', 'user'], config);
	const userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

	/**
	 * returns a date string formatted using the site's locale and timezone
	 */
	const formatDateForSite: FormatDateFn = (date, options) => {
		const dateObject = date instanceof Date ? date : parseISO(date);
		if (!isValid(dateObject)) {
			return null;
		}
		const formatOptions = { ...deafultOptions, ...options };
		return dateObject.toLocaleString(siteLC, { ...formatOptions, timeZone: siteTZ });
	};

	/**
	 * returns a date string formatted using the user's locale and timezone
	 */
	const formatDateForUser: FormatDateFn = (date, options) => {
		const dateObject = date instanceof Date ? date : parseISO(date);
		if (!isValid(dateObject)) {
			return null;
		}
		const formatOptions = { ...deafultOptions, ...options };
		return dateObject.toLocaleString(userLC, { ...formatOptions, timeZone: userTZ });
	};

	/**
	 * returns a date string formatted using the site's locale but UTC timezone
	 */
	const formatUtcDateForSite: FormatDateFn = (date, options) => {
		const dateObject = date instanceof Date ? date : parseISO(date);
		if (!isValid(dateObject)) {
			return null;
		}
		const formatOptions = { ...deafultOptions, ...options };
		return dateObject.toLocaleString(siteLC, { ...formatOptions, timeZone: 'UTC' });
	};

	/**
	 * returns a date string formatted using the user's locale but UTC timezone
	 */
	const formatUtcDateForUser: FormatDateFn = (date, options) => {
		const dateObject = date instanceof Date ? date : parseISO(date);
		if (!isValid(dateObject)) {
			return null;
		}
		const formatOptions = { ...deafultOptions, ...options };
		return dateObject.toLocaleString(userLC, { ...formatOptions, timeZone: 'UTC' });
	};

	const localTimeToUtc: DateFn = (date) => {
		return localToUtc(date, siteTZ);
	};

	const utcToLocalTime: DateFn = (isoDate) => {
		return utcToLocal(isoDate, siteTZ);
	};

	return {
		formatDateForSite,
		formatDateForUser,
		formatUtcDateForSite,
		formatUtcDateForUser,
		localTimeToUtc,
		utcToLocalTime,
	};
};

export default useTimeZoneTime;
