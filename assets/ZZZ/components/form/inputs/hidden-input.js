/**
 * External imports
 */
import { Field } from 'react-final-form';
import PropTypes from 'prop-types';

/**
 * generates an HTML5 text variant <input>
 *
 * @function
 * @param {string} type
 * @param {string} name
 * @param {string} htmlId
 * @param {Object} dataSet
 * @param {Object} attributes
 * @return {string} rendered date name form row
 */
const HiddenInput = ( {
	name,
	htmlId,
	dataSet,
	...attributes
} ) => {
	return (
		<Field
			component="input"
			type="hidden"
			name={ name }
			id={ htmlId }
			{ ...dataSet }
			{ ...attributes }
		/>
	);
};

HiddenInput.propTypes = {
	name: PropTypes.string.isRequired,
	htmlId: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	dataSet: PropTypes.object,
};

export default HiddenInput;
