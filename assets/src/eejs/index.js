/**
 * WordPress imports
 */
import * as wpI18n from '@wordpress/i18n';

/**
 * Exported to the `eejs` global.
 */
export { default as data } from './data';

/**
 * Wrapper around wp.i18n functionality so its exposed on the eejs global as
 * eejs.i18n;
 */
export const i18n = wpI18n;

/**
 * use this for eejs exceptions
 * Usage: throw new eejs.exception('some message')
 * @param {string} msg
 */
export const exception = function( msg ) {
	this.message = msg;
};
