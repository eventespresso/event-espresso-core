/**
 * WordPress imports
 */
import * as wpI18n from '@wordpress/i18n';

/**
 * Exported to the `eejs` global.
 */

/**
 * This will hold arbitrary data assigned by the Assets Registry.
 * @type {{}}
 */
export const data = eejsdata.data || {};

/**
 * Wrapper around wp.i18n functionality so its exposed on the eejs global as
 * eejs.i18n;
 */
export const i18n = wpI18n;

/**
 * use this for eejs exceptions
 * Usage: throw new eejs.Exception('some message')
 * @param {string} msg
 */
export const Exception = function( msg ) {
	this.message = msg;
	this.name = 'Exception';
	this.stack = ( new Error() ).stack;
};

Exception.prototype = new Error;

export * from './utils/merge-and-de-duplicate';
