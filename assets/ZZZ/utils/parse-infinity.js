/**
 * External imports
 */
import { isNil } from 'lodash';

/**
 * converts infinite values to null for use in forms
 *
 * @function
 * @param {null|number|string} number
 * @param {boolean} asInt
 * @param {boolean} forDb
 * @return {number} converted infinite value
 */
const parseInfinity = ( number, asInt = false, forDb = false ) => {
	// returns true for any possible value that could represent infinity
	const representsInfinity = ( value ) =>
		value < 0 ||
		value === '' ||
		value === 'INF' ||
		value === Infinity ||
		isNil( value );

	if ( number && number.type && number.type.name === 'InfinitySymbol' ) {
		number = number.props.value;
	}

	number = representsInfinity( number ) ? Infinity : number;
	number = number !== Infinity && asInt ? parseInt( number, 10 ) : number;

	if ( isNaN( number ) ) {
		number = asInt ? -1 : Infinity;
	}
	// If infinity and for db
	if ( number === Infinity && forDb ) {
		number = -1;
	}
	return number;
};

export default parseInfinity;
