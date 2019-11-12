/**
 * External imports
 */
import { isArray } from 'lodash';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

/**
 * generates an html <select> input
 *
 * @function
 * @param {string} id
 * @param {string} htmlClass
 * @param {Array} options
 * @param {string} helpTextID
 * @param {Object} dataSet
 * @param {string} inputWidth
 * @param {Object} attributes
 * @return {string} rendered date name form row
 */
const SelectInput = ( {
	htmlId,
	htmlClass,
	options,
	helpTextID,
	dataSet,
	inputWidth = '',
	...attributes
} ) => {
	const selectOptions = isArray( options ) ? options : [];
	const optionList = selectOptions.map( ( option, index ) => (
		<option key={ index } value={ option.value }>
			{ option.label }
		</option>
	) );
	const classes = inputWidth ?
		`${ htmlClass } ee-input-width-${ inputWidth }` :
		htmlClass;
	return (
		<Field
			component="select"
			id={ htmlId }
			className={ `${ classes } form-control` }
			aria-describedby={ helpTextID }
			{ ...dataSet }
			{ ...attributes }
		>
			{ optionList }
		</Field>
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
	onChange: PropTypes.func,
	helpTextID: PropTypes.string,
	dataSet: PropTypes.object,
	inputWidth: PropTypes.string,
};

export default SelectInput;
