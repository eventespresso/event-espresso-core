/**
 * External imports
 */
import { isArray, indexOf } from 'lodash';
import PropTypes from 'prop-types';

/**
 * generates the initial checked state
 * for a set of checkbox or radio button
 * options based on the set values.
 * This can be overridden by setting reset to true
 * which will uncheck all options.
 *
 * @function
 * @param {string} inputId
 * @param {Array} options
 * @param {Array} values
 * @param {boolean} reset
 * @return {Object} state
 */
const OptionCheckedState = ( inputId, options, values, reset = false ) => {
	const checked = {};
	options = isArray( options ) ? options : [];
	values = isArray( values ) ? values : [ values ];
	options.forEach( function( option, index ) {
		const key = inputId + '-' + index;
		checked[ key ] = ! reset && indexOf( values, option.value ) !== -1;
	} );
	return checked;
};

OptionCheckedState.propTypes = {
	inputId: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	values: PropTypes.arrayOf( [
		PropTypes.number,
		PropTypes.string,
	] ),
	reset: PropTypes.bool,
};

export default OptionCheckedState;
