/**
 * External imports
 */
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

/**
 * generates an html <textarea> input
 *
 * @function
 * @param {string} htmlId
 * @param {string} htmlClass
 * @param {string} helpTextID
 * @param {Object} dataSet
 * @param {Object} attributes
 * @return {string} rendered date name form row
 */
export const Textarea = ( {
	htmlId,
	htmlClass,
	helpTextID,
	dataSet,
	...attributes
} ) => {
	return (
		<Field
			component="textarea"
			id={ htmlId }
			className={ `${ htmlClass } form-control` }
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
	onChange: PropTypes.func,
	helpTextID: PropTypes.string,
	dataSet: PropTypes.object,
};
