/**
 * External imports
 */
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { CheckboxControl, ToggleControl } from '@wordpress/components';

/**
 * connects a WP CheckboxControl or ToggleControl with React-Final-Form
 *
 * @function
 * @param {Object} input
 * @param {boolean} checked
 * @param {string} htmlId
 * @param {string} htmlClass
 * @param {string} helpTextID
 * @param {string} helpTextIfChecked
 * @param {string} helpTextIfNotChecked
 * @param {Object} dataSet
 * @param {string} toggle 'toggle' or 'checkbox'
 * @param {Object} attributes
 * @return {string} rendered date name form row
 */
const Toggle = ( {
	input,
	checked,
	htmlId,
	htmlClass,
	helpTextID,
	helpTextIfChecked,
	helpTextIfNotChecked,
	dataSet,
	toggle = 'toggle', // 'toggle' or 'checkbox'
	...attributes
} ) => {
	// console.log( '' );
	// console.log( 'ToggleInput.render() checked', checked );
	htmlClass = htmlClass ?
		`${ htmlClass } ee-toggle-input` :
		'ee-toggle-input';
	return toggle === 'toggle' ? (
		<div className={ `${ htmlClass } ee-switch-toggle` } >
			<ToggleControl
				checked={ checked }
				instanceId={ htmlId }
				aria-describedby={ helpTextID }
				label={ checked ? helpTextIfChecked : helpTextIfNotChecked }
				onChange={ input.onChange }
				{ ...dataSet }
				{ ...attributes }
			/>
		</div>
	) : (
		<div className={ `${ htmlClass } ee-checkbox-toggle` }>
			<CheckboxControl
				checked={ checked }
				instanceId={ htmlId }
				aria-describedby={ helpTextID }
				label={ checked ? helpTextIfChecked : helpTextIfNotChecked }
				onChange={ input.onChange }
				{ ...dataSet }
				{ ...attributes }
			/>
		</div>
	);
};

Toggle.propTypes = {
	checked: PropTypes.bool.isRequired,
	htmlId: PropTypes.string.isRequired,
	htmlClass: PropTypes.string,
	onChange: PropTypes.func,
	helpTextID: PropTypes.string,
	helpTextIfChecked: PropTypes.string.isRequired,
	helpTextIfNotChecked: PropTypes.string.isRequired,
	dataSet: PropTypes.object,
};

/**
 * @function
 * @param {Object} attributes
 * @return {Object} rendered input
 */
export const ToggleInput = ( attributes ) => {
	return (
		<Field
			component={ Toggle }
			{ ...attributes }
		/>
	);
};
