/**
 * External imports
 */
import PropTypes from 'prop-types';

/**
 * Internal imports
 */
import { HTML5_INPUT_TYPES_TEXT } from './constants';

/**
 * generates an HTML5 text variant <input>
 *
 * @function
 * @param {string} type
 * @param {string} htmlId
 * @param {string} htmlClass
 * @param {string} value
 * @param {Function} onChange
 * @param {string} helpTextID
 * @param {Object} dataSet
 * @param {Object} attributes
 * @return {string} rendered date name form row
 */
export const TextInput = ( {
	type = 'text',
	htmlId,
	htmlClass,
	value,
	onChange,
	helpTextID,
	dataSet,
	...attributes
} ) => {
	return (
		<input
			type={ type }
			id={ htmlId }
			className={ `${ htmlClass } form-control` }
			defaultValue={ value }
			onChange={ onChange }
			aria-describedby={ helpTextID }
			{ ...dataSet }
			{ ...attributes }
		/>
	);
};

TextInput.propTypes = {
	type: PropTypes.oneOf( HTML5_INPUT_TYPES_TEXT ),
	htmlId: PropTypes.string.isRequired,
	htmlClass: PropTypes.string,
	value: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ),
	onChange: PropTypes.func.isRequired,
	helpTextID: PropTypes.string,
	dataSet: PropTypes.object,
};
