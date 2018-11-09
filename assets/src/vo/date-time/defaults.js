/**
 * External imports
 */
import {
	TIMEZONE_CONFIG,
	SERVER_LOCALE,
} from '@eventespresso/eejs';
import {
	FORMAT_SITE_DATE,
	FORMAT_SITE_TIME,
} from '@eventespresso/helpers';
import { validateLocale } from './assertions';

import { snakeCase } from 'lodash';
/**
 * Default timezone string to use.
 *
 * @type {string}
 */
export const DEFAULT_TIMEZONE_STRING = TIMEZONE_CONFIG.string;

/**
 * Default offset
 *
 * @type {number}
 */
export const DEFAULT_OFFSET = TIMEZONE_CONFIG.offset;

/**
 * Whether there is a default timezone string to use.
 * This helps with determining whether to use the offset or not for constructing
 * DateTime value objects.
 *
 * @type {boolean}
 */
export const HAS_TIMEZONE_STRING = (
	DEFAULT_TIMEZONE_STRING !== 'UTC' ||
	! ( DEFAULT_TIMEZONE_STRING === 'UTC' && DEFAULT_OFFSET !== 0 )
);

/**
 *
 * @type {string}
 */
export const DEFAULT_FORMAT = FORMAT_SITE_DATE + ' ' + FORMAT_SITE_TIME;

/**
 * Exposes what to use for the default locale.
 * @type {string}
 */
export const DEFAULT_LOCALE = snakeCase( SERVER_LOCALE.user );

/**
 * This ensures that the provided locale is valid.  So if `DEFAULT_LOCALE` is
 * not valid for this environment, then a fallback of 'en' locale is used.
 *
 * @type {string}
 */
export const DEFAULT_VALID_LOCALE = validateLocale( DEFAULT_LOCALE ) ?
	DEFAULT_LOCALE :
	'en';
