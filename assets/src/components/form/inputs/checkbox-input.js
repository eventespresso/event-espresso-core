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
 * Generates one or more html checkbox inputs
 *
 * @function
 * @param {Object} props
 * @return {string} rendered checkbox inputs
 */
export const CheckboxInput = ( {
	name,
	htmlId,
	options,
	required,
	helpTextID,
	btnGroup = true,
	inputWidth = '',
	...attributes
} ) => {
	const [ checked, setChecked ] = useState( resetState() );
	let { htmlClass } = attributes;

	htmlClass = required ?
		`${ htmlClass } ee-checkbox-group-required` :
		htmlClass;
	const labelClass = btnGroup ?
		'btn btn-primary' :
		'ee-checkbox-label-after' + OptionLabelSize( options );
	let divClass = btnGroup ? 'btn-group' : 'ee-checkbox-group';
	divClass = inputWidth ?
		`${ divClass } ee-input-width-${ inputWidth }` :
		divClass;

	/**
	 * @function
	 * @return {Object} state
	 */
	const resetState = () => {
		return OptionCheckedState(
			htmlId,
			options,
			attributes.initialValue,
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
			const _checked = checked;
			_checked[ event.target.id ] = event.target.checked;
			setChecked( _checked );
		}
	};

	return (
		<div className={ divClass }>
			<OptionInputs
				type="checkbox"
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

CheckboxInput.propTypes = {
	htmlId: PropTypes.string.isRequired,
	htmlClass: PropTypes.string,
	value: PropTypes.oneOfType( [
		PropTypes.array,
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
