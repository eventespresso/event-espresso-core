/**
 * External imports
 */
import PropTypes from 'prop-types';

/**
 * generates an html <textarea> input
 *
 * @function
 * @param {string} htmlId
 * @param {string} htmlClass
 * @param {string} value
 * @param {Function} onChange
 * @param {string} helpTextID
 * @param {Object} dataSet
 * @param {Object} attributes
 * @return {string} rendered date name form row
 */
export const Textarea = ( {
	htmlId,
	htmlClass,
	value,
	onChange,
	helpTextID,
	dataSet,
	...attributes
} ) => {
	return (
		<textarea
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

Textarea.propTypes = {
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
