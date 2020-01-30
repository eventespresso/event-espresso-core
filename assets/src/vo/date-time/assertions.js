/**
 * External imports
 */
import moment from 'moment-timezone';
import { isString, isNumber } from 'lodash';

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
	if ( ! isString( locale ) ) {
		return false;
	}
	const originalLocale = moment.locale();
	const validationLocale = moment.locale( locale );
	// reset back to original locale
	moment.locale( originalLocale );
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
 * Note: date regex pattern from
 * http://www.pelagodesign.com/blog/2009/05/20/iso-8601-date-validation-that-doesnt-suck/
 * Note: isDuration regex pattern from
 * https://github.com/cylc/cylc/issues/119#issuecomment-9435533
 *
 * @param {string} dateTimeString
 * @param {boolean} isDuration  Whether to validate for a duration format or not.
 * @return {boolean}  Returns false if the given string is not valid ISO8601
 * format
 */
export function validateISO8601( dateTimeString, isDuration = false ) {
	if ( ! isString( dateTimeString ) ) {
		return false;
	}
	const regex = isDuration ?
		/^(R\d*\/)?P(?:\d+(?:\.\d+)?Y)?(?:\d+(?:\.\d+)?M)?(?:\d+(?:\.\d+)?W)?(?:\d+(?:\.\d+)?D)?(?:T(?:\d+(?:\.\d+)?H)?(?:\d+(?:\.\d+)?M)?(?:\d+(?:\.\d+)?S)?)?$/ :
		/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
	return regex.test( dateTimeString );
}

/**
 * Asserts whether the given string is a valid ISO8601 formatted date and time
 * string.
 *
 * @param {string} dateTimeString
 * @param {boolean} isDuration  Whether to assert for a duration format or not.
 * @throws InvalidISO8601String
 */
export function assertISO8601IsValid( dateTimeString, isDuration = false ) {
	if ( ! validateISO8601( dateTimeString, isDuration ) ) {
		throw new InvalidISO8601String( dateTimeString );
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
	if ( ! isString( timezone ) ) {
		return false;
	}
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

/**
 * Validates whether the given value is an instance of the javascript Date
 * object.
 *
 * @param {Date} date
 * @return {boolean} True means the value is an instance of Date
 */
export function validateIsDate( date ) {
	return date instanceof Date;
}

/**
 * Asserts whether the given value is an instance of Date.
 * @param {Date} date
 * @throws TypeError
 */
export function assertIsDate( date ) {
	if ( ! validateIsDate( date ) ) {
		throw new TypeError(
			'The provided value is not an instance of Date'
		);
	}
}

/**
 * Validates whether the provided value is a valid offset
 *
 * Currently this just validates the provided value is a number. Eventually it
 * might check upper and lower limits.
 *
 * @param {number} offset
 * @return {boolean}  true means its valid.
 */
export function validateIsOffset( offset ) {
	return isNumber( offset );
}

/**
 * Asserts whether the provided value is a valid offset.
 *
 * @param {number} offset
 * @throws TypeError
 */
export function assertIsOffset( offset ) {
	if ( ! validateIsOffset( offset ) ) {
		throw new TypeError(
			'Offset is expected to be a number'
		);
	}
}
