/**
 * External imports
 */
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

/**
 * Internal imports
 */
import { HTML5_INPUT_TYPES_TEXT } from './base/constants';

/**
 * generates an HTML5 text variant <input>
 *
 * @function
 * @param {string} type
 * @param {string} htmlId
 * @param {string} htmlClass
 * @param {string} helpTextID
 * @param {Object} dataSet
 * @param {number|string} inputWidth
 * @param {Object} attributes
 * @return {string} rendered date name form row
 */
export const TextInput = ( {
	type = 'text',
	htmlId,
	htmlClass,
	helpTextID,
	dataSet,
	inputWidth = '',
	...attributes
} ) => {
	htmlClass = inputWidth ?
		`${ htmlClass } ee-input-width-${ inputWidth }` :
		htmlClass;
	return (
		<Field
			component="input"
			type={ type }
			id={ htmlId }
			className={ `${ htmlClass } form-control` }
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
	onChange: PropTypes.func,
	helpTextID: PropTypes.string,
	dataSet: PropTypes.object,
	inputWidth: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ),
};
