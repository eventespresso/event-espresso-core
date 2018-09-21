/**
 * External imports
 */
import { isArray } from 'lodash';
import PropTypes from 'prop-types';

/**
 * generates an html <select> input
 *
 * @function
 * @param {string} id
 * @param {string} htmlClass
 * @param {string} value
 * @param {Array} options
 * @param {Function} onChange
 * @param {string} helpTextID
 * @param {Object} dataSet
 * @param {Object} attributes
 * @return {string} rendered date name form row
 */
export const SelectInput = ( {
	htmlId,
	htmlClass,
	value,
	options,
	onChange,
	helpTextID,
	dataSet,
	...attributes
} ) => {
	options = isArray( options ) ? options : [];
	const optionList = options.map( ( option, index ) => (
		<option key={ index } value={ option.value }>
			{ option.label }
		</option>
	) );
	return (
		<select
			id={ htmlId }
			className={ `${ htmlClass } form-control` }
			defaultValue={ value }
			onBlur={ onChange }
			aria-describedby={ helpTextID }
			{ ...dataSet }
			{ ...attributes }
		>
			{ optionList }
		</select>
	);
};

SelectInput.propTypes = {
	htmlId: PropTypes.string.isRequired,
	htmlClass: PropTypes.string,
	value: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ),
	options: PropTypes.array,
	onChange: PropTypes.func.isRequired,
	helpTextID: PropTypes.string,
	dataSet: PropTypes.object,
};
