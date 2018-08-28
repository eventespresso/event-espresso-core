/**
 * External imports
 */
import moment from 'moment-timezone';
import { FORMAT_SITE_DATE, FORMAT_SITE_TIME } from './site-data';
import { trimEnd } from 'lodash';

/**
 * Internal imports
 */
import { SEPARATOR_SPACE_DASH_SPACE } from './separators';

export const DATE_TIME_FORMAT_MYSQL = 'YYYY-MM-DD HH:mm:ss';
export const DATE_TIME_FORMAT_ISO8601 = moment.DefaultFormat;
export const DATE_TIME_FORMAT_SITE = FORMAT_SITE_DATE + ' ' + FORMAT_SITE_TIME;
export const DATE_FORMAT_SITE = FORMAT_SITE_DATE;
export const TIME_FORMAT_SITE = FORMAT_SITE_TIME;

/**
 * Recieves a moment parseable dateString and returns a string in the provided
 * format.
 * @param { string } dateString  Incoming date string.  Should be parseable by
 *   moment
 * @param { string } format        Incoming format string.  Should be a format
 *   useable by moment.
 * @param { boolean } local        Whether or not convert the date to the local
 *   time on output (local being the browser set timezone). If this is set to
 *   true, it's recommended the incoming dateString is in UTC OR the format of
 *   the incoming string includes offset info.
 * @return { string }  Returns a date string in the provided format.
 */
export const formatDateString = (
	dateString = '',
	format = DATE_TIME_FORMAT_ISO8601,
	local = true,
) => {
	const date = stringToMoment( dateString );
	return local ?
		date.local().format( format ) :
		date.format( format );
};

/**
 * Receives a moment parseable dateString and returns a string in the mysql
 * date and time format.
 * @param { string } dateString  Incoming date string.  Should be parseable by
 *   moment
 * @param { boolean } local        Whether or not convert the date to the local
 *   time on output (local being the browser set timezone). If this is set to
 *   true, it's recommended the incoming dateString is in UTC OR the format of
 *   the incoming string includes offset info.
 * @return { string }  Returns a date string in mysql format.
 */
export const formatMysqlDateString = ( dateString = '', local = true ) => {
	return formatDateString( dateString, DATE_TIME_FORMAT_MYSQL, local );
};

/**
 * Receives a moment parseable dateString and returns a string in the format
 * currently set on the host site.
 * @param { string } dateString  Incoming date string.  Should be parseable by
 *   moment
 * @param { boolean } local        Whether or not convert the date to the local
 *   time on output (local being the browser set timezone). If this is set to
 *   true, it's recommended the incoming dateString is in UTC OR the format of
 *   the incoming string includes offset info.
 * @return { string }  Returns a date string in sites format.
 */
export const formatSiteDateString = ( dateString = '', local = true ) => {
	return formatDateString( dateString, DATE_TIME_FORMAT_SITE, local );
};

/**
 * A quick wrapper for returning a moment object. If dateString is provided, a
 * moment object is returned for that dateString, otherwise the moment object
 * will represent "now" (the time the object was created).
 *
 * @param { string } dateString Incoming date string.  Should be parseable by
 *   moment
 * @return {null|moment.Moment}  A moment object.
 */
export const stringToMoment = ( dateString = '' ) => {
	return dateString === '' ? moment() : moment( dateString );
};

/**
 * Receives an indefinite number of dateStrings as arguments and concatenates
 * them together with the given separator.
 * @param { string } separator
 * @param { ...string } dateStrings
 * @return { string }  Returns a string concatenating all the provided
 *   dateStrings together with the given separator.
 */
export const allDateTimesAsString = ( separator = SEPARATOR_SPACE_DASH_SPACE, ...dateStrings ) => {
	let content = '';
	dateStrings.forEach( ( item ) => {
		content += item + separator;
	} );
	return trimEnd( content, separator );
};
