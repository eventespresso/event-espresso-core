/**
 * External imports
 */
import { isArray } from 'lodash';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

/**
 * Internal imports
 */
import InputLabel from './input-label';

/**
 * generates the <label><input> pairings for
 * a set of html checkbox or radio inputs
 *
 * @function
 * @param {string} type
 * @param {string} name
 * @param {Object} checkedState
 * @param {string} htmlId
 * @param {string} htmlClass
 * @param {string} labelClass
 * @param {Array} options
 * @param {Function} onChange
 * @param {Function} onClick
 * @param {string} helpTextID
 * @param {Object} dataSet
 * @param {Object} attributes
 * @return {Array} css class describing label size
 */
const OptionInputs = ( {
	type,
	name,
	checkedState,
	htmlId,
	htmlClass,
	labelClass,
	options,
	onClick,
	helpTextID,
	dataSet,
	...attributes
} ) => {
	delete attributes.initialValue;
	const inputOptions = isArray( options ) ? options : [ options ];
	const count = inputOptions.length;
	let checked = false;
	return inputOptions.map( ( option, index ) => {
		const id = `${ htmlId }-${ index }`;
		checked = checkedState[ id ];
		return (
			<InputLabel
				key={ index }
				label={ option.label }
				htmlFor={ id }
				htmlClass={ `${ labelClass } ${ checked ? 'active' : '' }` }
				strong={ false }
				onClick={ onClick }
			>
				<Field
					component="input"
					type={ type }
					name={ name }
					id={ id }
					className={ htmlClass }
					value={ option.value }
					checked={ checked }
					multiple={ count > 1 }
					aria-describedby={ helpTextID }
					{ ...dataSet }
					{ ...attributes }
				/>
			</InputLabel>
		);
	} );
};

OptionInputs.propTypes = {
	type: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	checkedState: PropTypes.object.isRequired,
	htmlId: PropTypes.string.isRequired,
	htmlClass: PropTypes.string,
	labelClass: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape( {
			label: PropTypes.string.isRequired,
			value: PropTypes.oneOfType( [
				PropTypes.number,
				PropTypes.string,
			] ),
		} ),
	),
	onChange: PropTypes.func,
	onClick: PropTypes.func.isRequired,
	helpTextID: PropTypes.string,
	dataSet: PropTypes.object,
};

export default OptionInputs;
