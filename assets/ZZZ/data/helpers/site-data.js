/**
 * External imports
 */
import { data } from '@eventespresso/eejs';

data.site_formats = data.site_formats || {};

/**
 * All available site formats exposed via the eejs.data global from the server.
 * @type {{}}
 */
export const { date_formats: dateFormats = {} } = data.site_formats;

/**
 * The date format used by the site or mysql date format if not set.
 * @type { string }
 */
export const FORMAT_SITE_DATE = dateFormats.moment_split &&
	dateFormats.moment_split.date ?
	dateFormats.moment_split.date :
	'YY-MM-DD';

/**
 * The time format used by the site or mysql time format if not set.
 * @type { string }
 */
export const FORMAT_SITE_TIME = dateFormats.moment_split &&
	dateFormats.moment_split.time ?
	dateFormats.moment_split.time :
	'HH:mm:ss';
