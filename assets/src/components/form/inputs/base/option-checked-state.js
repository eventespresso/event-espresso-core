/**
 * External imports
 */
import { isArray, indexOf } from 'lodash';
import PropTypes from 'prop-types';

/**
 * generates the initial checked state
 * for a set of checkbox or radio button
 * options based on the set defaultValue.
 * This can be overridden by supplying
 * an alternate value via the fourth param,
 * which is used to reset all values.
 *
 * @function
 * @param {string} inputId
 * @param {Array} options
 * @param {mixed} values
 * @param {mixed} reset
 * @return {Object} state
 */
export const OptionCheckedState = ( inputId, options, values, reset ) => {
	const checked = {};
	options = isArray( options ) ? options : [];
	values = isArray( values ) ? values : [ values ];
	options.forEach( function( option, index ) {
		const key = inputId + '-' + index;
		const isSelected = indexOf( values, option.value ) !== -1;
		checked[ key ] = reset === undefined ? isSelected : reset;
	} );
	return checked;
};

OptionCheckedState.propTypes = {
	inputId: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	defaultValue: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ),
	value: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ),
};
