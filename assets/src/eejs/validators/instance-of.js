/**
 * Helper method for determining whether the given object instance is an
 * instance of the given expected class/function name.  This is a more reliable
 * method for doing instanceof checks than an `instanceof` expression.
 *
 * @param {Object} objectInstance
 * @param {string} expectedName
 * @return {boolean} True means the object is an instance of expectedName.
 */
export function instanceOf( objectInstance, expectedName ) {
	if ( ! objectInstance ||
		! objectInstance.constructor ||
		! objectInstance.constructor.name
	) {
		return false;
	}
	return objectInstance.constructor.name === expectedName;
}
