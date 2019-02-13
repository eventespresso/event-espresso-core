/**
 * External imports
 */
import { __, _n, sprintf } from '@eventespresso/i18n';
import {
	isFloat as isValidFloat,
	isInteger as isValidInteger,
	isNumeric as isValidNumeric,
	floatLessThanOrEqualTo,
	stringLengthLessThanOrEqualTo,
	numberLessThanOrEqualTo,
	floatGreaterThanOrEqualTo,
	stringLengthGreaterThanOrEqualTo,
	numberGreaterThanOrEqualTo,
} from '../../../data/helpers/validations';

/**
 * @function
 * @param {mixed} value
 * @return {string|null} error string on fail
 */
export const isFloat = value => ! isValidFloat( +value ) ?
	__( 'Value must be a float', 'event_espresso' ) :
	null;

/**
 * @function
 * @param {mixed} value
 * @return {string|null} error string on fail
 */
export const isInteger = value => ! isValidInteger( +value ) ?
	__( 'Value must be an integer', 'event_espresso' ) :
	null;

/**
 * @function
 * @param {mixed} value
 * @return {string|undefined} error string on fail
 */
export const isNumeric = value => ! isValidNumeric( +value ) ?
	__( 'Value must be a number', 'event_espresso' ) :
	null;

/**
 * @function
 * @param {mixed} fieldValue
 * @param {string} fieldName
 * @return {string|undefined} error string on fail
 */
export const matches = ( fieldValue, fieldName ) => valueToMatch =>
	! valueToMatch || fieldValue !== valueToMatch ?
		sprintf(
			__( 'Value should match %s', 'event_espresso' ),
			fieldName
		) : null;

/**
 * @function
 * @param {number} max
 * @return {string|null} error string on fail
 */
export const maxFloat = max => value =>
	! floatLessThanOrEqualTo( +max, +value ) ?
		sprintf(
			_n(
				'Number should not be greater than %f',
				'Number should not be greater than %f',
				max,
				'event_espresso'
			),
			max
		) : null;

/**
 * @function
 * @param {number} max
 * @return {string|null} error string on fail
 */
export const maxLength = ( max = 1024 ) => value => (
	! stringLengthLessThanOrEqualTo( +max, value ) ?
		sprintf(
			_n(
				'Value should not exceed %d character in length',
				'Value should not exceed %d characters in length',
				max,
				'event_espresso'
			),
			max
		) : null
);

/**
 * @function
 * @param {number} max
 * @return {string|null} error string on fail
 */
export const maxNumber = max => value => (
	! numberLessThanOrEqualTo( +max, +value ) ?
		sprintf(
			_n(
				'Number should not be greater than %d',
				'Number should not be greater than %d',
				max,
				'event_espresso'
			),
			max
		) : null
);

/**
 * @function
 * @param {number} min
 * @return {string|null} error string on fail
 */
export const minFloat = min => value => (
	! floatGreaterThanOrEqualTo( +min, +value ) ?
		sprintf(
			_n(
				'Number should not be less than %f',
				'Number should not be less than %f',
				min,
				'event_espresso'
			),
			min
		) : null
);

/**
 * @function
 * @param {number} min
 * @return {string|null} error string on fail
 */
export const minLength = ( min = 1 ) => value => (
	! stringLengthGreaterThanOrEqualTo( +min, value ) ?
		sprintf(
			_n(
				'Value should be at least %d character in length',
				'Value should be at least %d characters in length',
				min,
				'event_espresso'
			),
			min
		) : null
);

/**
 * @function
 * @param {number} min
 * @return {string|null} error string on fail
 */
export const minNumber = min => value => (
	! numberGreaterThanOrEqualTo( +min, +value ) ?
		sprintf(
			_n(
				'Number should not be less than %d',
				'Number should not be less than %d',
				min,
				'event_espresso'
			),
			min
		) : null
);

/**
 * @function
 * @param {mixed} value
 * @return {string|null} error string on fail
 */
export const required = value => ! value ?
	__( 'Please enter a value', 'event_espresso' ) :
	null;

const validations = {
	isFloat,
	isInteger,
	isNumeric,
	matches,
	maxFloat,
	maxLength,
	maxNumber,
	minFloat,
	minLength,
	minNumber,
	required,
};
export default validations;
