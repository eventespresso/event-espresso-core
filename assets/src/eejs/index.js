/**
 * Exported to the `eejs` global.
 */

/**
 * This will hold arbitrary data assigned by the Assets Registry.
 * @type {{}}
 */
export let data = eejsdata.data || {};

/**
 * use this for eejs exceptions
 * Usage: throw new eejs.exception('some message')
 */
export let exception = function( msg ) {
  this.msg = msg;
}