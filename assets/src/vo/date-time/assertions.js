/**
 * External imports
 */
import moment from 'moment';

/**
 * Internal imports
 */
import {
	InvalidTimezone,
	InvalidISO8601String,
	InvalidLocale,
} from '@eventespresso/eejs';

/**
 * Validates whether the given locale string is a valid locale.
 *
 * @param  {string} locale
 * @return {boolean} If given locale string is not valid this will return false.
 */
export function validateLocale( locale ) {
	const validationLocale = moment.locale( locale );
	return ! ( locale !== 'en' && validationLocale === 'en' );
}

/**
 * Asserts whether given locale string is valid.  If it's not an exception is
 * thrown.
 *
 * @param {string} locale
 * @throws InvalidLocale
 */
export function assertLocaleIsValid( locale ) {
	if ( ! validateLocale( locale ) ) {
		throw new InvalidLocale( locale );
	}
}

/**
 * Validates whether the given string is a valid ISO8601 formatted date and
 * time string.
 *
 * @param {string} dateTimeString
 * @return {boolean}  Returns false if the given string is not valid ISO8601
 * format
 */
export function validateISO8601( dateTimeString ) {
	const dt = moment( dateTimeString, moment.ISO_8601, true );
	return dt.isValid();
}

/**
 * Asserts whether the given string is a valid ISO8601 formatted date and time
 * string.
 *
 * @param {string} dateTimeString
 * @throws InvalidISO8601String
 */
export function assertISO8601IsValid( dateTimeString ) {
	if ( ! validateISO8601( dateTimeString ) ) {
		throw new InvalidISO8601String( dateTimeString )
	}
}

/**
 * Validates whether the given string is a valid timezone string.
 *
 * @param {string} timezone
 * @return {boolean} Returns false if the given string is not a valid timezone
 * string
 */
export function validateTimezone( timezone ) {
	const dt = moment.tz.zone( timezone );
	return dt !== null;
}

/**
 * Asserts whether the given string is a valid timezone string and throws an
 * exception if it isn't.
 *
 * @param {string} timezone
 * @throws InvalidTimezone
 */
export function assertTimezoneIsValid( timezone ) {
	if ( ! validateTimezone( timezone ) ) {
		throw new InvalidTimezone( timezone );
	}
}
