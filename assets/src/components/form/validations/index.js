/**
 * External imports
 */
import { __, _n, sprintf } from '@eventespresso/i18n';

/**
 * @function
 * @param {mixed} value
 * @return {string|null} error string on fail
 */
export const isFloat = value => {
	// first convert to string
	value = value + '';
	// convert decimal to known format
	value = value.replace( ',', '.' );
	// strip all trailing zeros
	value = value.replace( /0+$/, '' );
	const lastChar = value.substr( value.length - 1 );
	const float = (
		// parsed value is same as original coerced to a number
		parseFloat( value, 10 ) === +value &&
		(
			// no remainder but last character is a decimal
			// ie: original value like 1.0
			( value % 1 === 0 && lastChar === '.' ) ||
			// has a remainder and last character is NOT a decimal
			// ie: original value like 1.# where # is not 0
			( value % 1 !== 0 && lastChar !== '.' )
		)
	);
	return ! float ? __( 'Value must be a float', 'event_espresso' ) : null;
};

/**
 * @function
 * @param {mixed} value
 * @return {string|null} error string on fail
 */
export const isInteger = value => {
	return ! ( parseInt( value, 10 ) === +value || value % 1 === 0 ) ?
		__( 'Value must be an integer', 'event_espresso' ) :
		null;
};

/**
 * @function
 * @param {mixed} value
 * @return {string|undefined} error string on fail
 */
export const isNumeric = value => {
	return isNaN( value ) ?
		__( 'Value must be a number', 'event_espresso' ) :
		null;
};

/**
 * @function
 * @param {mixed} field
 * @param {string} fieldName
 * @return {string|undefined} error string on fail
 */
export const matches = ( field, fieldName ) => value => {
	return ! value || field !== value ?
		sprintf(
			__( 'Value should match %s', 'event_espresso' ),
			fieldName
		) : null;
};

/**
 * @function
 * @param {number} max
 * @return {string|null} error string on fail
 */
export const maxFloat = max => value => {
	max = parseFloat( max, 10 );
	return parseFloat( value, 10 ) > max ?
		sprintf(
			_n(
				'Number should be less than %f',
				'Number should be less than %f',
				max,
				'event_espresso'
			),
			max
		) : null;
};

/**
 * @function
 * @param {number} max
 * @return {string|null} error string on fail
 */
export const maxLength = ( max = 1024 ) => value => {
	max = parseInt( max, 10 );
	return value !== undefined && parseInt( value.length, 10 ) > max ?
		sprintf(
			_n(
				'Value should not exceed %d character in length',
				'Value should not exceed %d characters in length',
				max,
				'event_espresso'
			),
			max
		) : null;
};

/**
 * @function
 * @param {number} max
 * @return {string|null} error string on fail
 */
export const maxNumber = max => value => {
	max = parseInt( max, 10 );
	return parseInt( value, 10 ) > max ?
		sprintf(
			_n(
				'Number should be less than %d',
				'Number should be less than %d',
				max,
				'event_espresso'
			),
			max
		) : null;
};

/**
 * @function
 * @param {number} min
 * @return {string|null} error string on fail
 */
export const minFloat = min => value => {
	min = parseFloat( min, 10 );
	return parseFloat( value, 10 ) < min ?
		sprintf(
			_n(
				'Number should be greater than %f',
				'Number should be greater than %f',
				min,
				'event_espresso'
			),
			min
		) : null;
};

/**
 * @function
 * @param {number} min
 * @return {string|null} error string on fail
 */
export const minLength = ( min = 1 ) => value => {
	min = parseInt( min, 10 );
	return value === undefined ||
	( value && parseInt( value.length, 10 ) < min ) ?
		sprintf(
			_n(
				'Value should be at least %d character in length',
				'Value should be at least %d characters in length',
				min,
				'event_espresso'
			),
			min
		) : null;
};

/**
 * @function
 * @param {number} min
 * @return {string|null} error string on fail
 */
export const minNumber = min => value => {
	min = parseInt( min, 10 );
	return parseInt( value, 10 ) < min ?
		sprintf(
			_n(
				'Number should be greater than %d',
				'Number should be greater than %d',
				min,
				'event_espresso'
			),
			min
		) : null;
};

/**
 * @function
 * @param {mixed} value
 * @return {string|null} error string on fail
 */
export const required = value => {
	return ! value ?
		__( 'This is a required field', 'event_espresso' ) :
		null;
};
