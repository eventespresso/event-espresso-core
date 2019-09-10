/**
 * External imports
 */
import PropTypes from 'prop-types';
import { parseInfinity } from '@eventespresso/eejs';

/**
 * InfinitySymbol
 * displays infinite values as an infinity symbol
 *
 * @function
 * @param {boolean|number|object|string} value
 * @param {boolean} asInt   whether to parse value as an integer
 * @return {Object}         rendered value or infinity symbol
 */
const InfinitySymbol = ( { value, asInt } ) => {
	value = parseInfinity( value, asInt );
	return value === Infinity ?
		<span className={ 'ee-infinity-sign' }>&infin;</span> :
		value;
};

InfinitySymbol.propTypes = {
	value: PropTypes.oneOfType( [
		PropTypes.bool,
		PropTypes.number,
		PropTypes.object,
		PropTypes.string,
	] ),
	asInt: PropTypes.bool,
};

InfinitySymbol.defaultProps = {
	value: '',
	asInt: false,
};

export default InfinitySymbol;
