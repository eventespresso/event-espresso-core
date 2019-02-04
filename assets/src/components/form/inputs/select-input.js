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
export const SelectInput = ( {
	htmlId,
	htmlClass,
	options,
	helpTextID,
	dataSet,
	inputWidth = '',
	...attributes
} ) => {
	options = isArray( options ) ? options : [];
	const optionList = options.map( ( option, index ) => (
		<option key={ index } value={ option.value }>
			{ option.label }
		</option>
	) );
	htmlClass = inputWidth ?
		`${ htmlClass } ee-input-width-${ inputWidth }` :
		htmlClass;
	return (
		<Field
			component="select"
			id={ htmlId }
			className={ `${ htmlClass } form-control` }
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
