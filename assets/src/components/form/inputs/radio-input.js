/**
 * External imports
 */
import { useState } from '@wordpress/element';
import PropTypes from 'prop-types';

/**
 * Internal imports
 */
import { OptionCheckedState } from './base/option-checked-state';
import { OptionInputs } from './base/option-inputs';
import { OptionLabelSize } from './base/option-label-size';

/**
 * generates one or more html radio inputs
 *
 * @function
 * @param {Object} props
 * @return {string} rendered radio inputs
 */
const RadioInput = ( {
	name,
	htmlId,
	htmlClass,
	options,
	helpTextID,
	btnGroup = true,
	inputWidth = '',
	initialValue,
	...attributes
} ) => {
	const [ checked, setChecked ] = useState( setCheckedState() );

	const labelClass = btnGroup ?
		'btn btn-primary' :
		'ee-radio-label-after' + OptionLabelSize( options );
	let divClass = btnGroup ? 'btn-group' : 'ee-checkbox-group';
	divClass = inputWidth ?
		`${ divClass } ee-input-width-${ inputWidth }` :
		divClass;

	/**
	 * @function
	 * @param {mixed} reset
	 * @return {Object} state
	 */
	const setCheckedState = ( reset ) => {
		return OptionCheckedState(
			htmlId,
			options,
			initialValue,
			reset
		);
	};
	/**
	 * @function
	 * @param {Object} event
	 */
	const toggleChecked = ( event ) => {
		if ( event.target &&
			event.target.id &&
			event.target.checked !== undefined
		) {
			const _checked = setCheckedState( false );
			_checked[ event.target.id ] = event.target.checked;
			setChecked( _checked );
		}
	};

	return (
		<div className={ divClass }>
			<OptionInputs
				type="radio"
				name={ name }
				checkedState={ checked }
				htmlId={ htmlId }
				htmlClass={ htmlClass }
				labelClass={ labelClass }
				options={ options }
				onClick={ toggleChecked }
				helpTextID={ helpTextID }
				{ ...attributes }
			/>
		</div>
	);
};

RadioInput.propTypes = {
	htmlId: PropTypes.string.isRequired,
	htmlClass: PropTypes.string,
	value: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ),
	options: PropTypes.array,
	onChange: PropTypes.func,
	btnGroup: PropTypes.bool,
	inputWidth: PropTypes.string,
	helpTextID: PropTypes.string,
	dataSet: PropTypes.object,
};

export default RadioInput;
