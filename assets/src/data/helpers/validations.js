/**
 * @function
 * @param {mixed} value
 * @return {boolean} false on fail
 */
export const isFloat = value => {
	const regex1 = /^([-+])?([0-9]+(\.[0-9]+)?|Infinity)$/;
	return regex1.test( +value ) &&
		parseFloat( value, 10 ) === value &&
		Number( value ) === value &&
		value % 1 !== 0;
};

/**
 * @function
 * @param {mixed} value
 * @return {boolean} false on fail
 */
export const isInteger = value => {
	return parseInt( value, 10 ) === value &&
		Number( value ) === value &&
		value % 1 === 0;
};

/**
 * @function
 * @param {mixed} value
 * @return {boolean} false on fail
 */
export const isNumeric = value => {
	return ! ( value instanceof Array ) &&
		! isNaN( parseFloat( value ) ) &&
		isFinite( value );
};

/**
 * @function
 * @param {number} max
 * @param {number} value
 * @return {boolean} true if value less than or equal to max
 */
export const floatLessThanOrEqualTo = ( max, value ) => {
	return parseFloat( value, 10 ) <= parseFloat( max, 10 );
};

/**
 * @function
 * @param {number} max
 * @param {number} value
 * @return {boolean} true if value less than or equal to max
 */
export const stringLengthLessThanOrEqualTo = ( max = 1024, value ) => {
	return value === null ||
		value === undefined ||
		typeof value === undefined ||
		( typeof value !== undefined && typeof value.length === 'undefined' ) ||
		// all of above equal to: zero or no length <= max length
		( typeof value.length !== 'undefined' &&
			parseInt( value.length, 10 ) <= parseInt( max, 10 )
		);
};

/**
 * @function
 * @param {number} max
 * @param {number} value
 * @return {boolean} true if value less than or equal to max
 */
export const numberLessThanOrEqualTo = ( max, value ) => {
	return parseInt( value, 10 ) <= parseInt( max, 10 );
};

/**
 * @function
 * @param {number} min
 * @param {number} value
 * @return {boolean} true if value greater than or equal to min
 */
export const floatGreaterThanOrEqualTo = ( min, value ) => {
	return parseFloat( value, 10 ) >= parseFloat( min, 10 );
};

/**
 * @function
 * @param {number} min
 * @param {number} value
 * @return {boolean} true if value greater than or equal to min
 */
export const stringLengthGreaterThanOrEqualTo = ( min, value ) => {
	return value !== null &&
		value !== undefined &&
		typeof value !== undefined &&
		typeof value.length !== 'undefined' &&
		parseInt( value.length, 10 ) >= parseInt( min, 10 );
};

/**
 * @function
 * @param {number} min
 * @param {number} value
 * @return {boolean} true if value greater than or equal to min
 */
export const numberGreaterThanOrEqualTo = ( min, value ) => {
	return parseInt( value, 10 ) >= parseInt( min, 10 );
};
