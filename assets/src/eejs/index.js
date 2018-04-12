/**
 * Exported to the `eejs` global.
 */

/**
 * This will hold arbitrary data assigned by the Assets Registry.
 * @type {{}}
 */
export const data = eejsdata.data || {};

/**
 * use this for eejs exceptions
 * Usage: throw new eejs.exception('some message')
 * @param {string} msg
 */
export const exception = function( msg ) {
	this.message = msg;
};
