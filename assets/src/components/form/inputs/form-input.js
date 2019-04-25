/**
 * External imports
 */
import PropTypes from 'prop-types';
import { Component, Fragment } from '@wordpress/element';
import { isFunction } from 'lodash';
import { OnChange } from 'react-final-form-listeners';

/**
 * Internal imports
 */
import { HTML5_INPUT_TYPES } from './base/constants';
import { CheckboxInput } from './checkbox-input';
import { DateTimeInput } from './date-time-input';
import { HiddenInput } from './hidden-input';
import { RadioInput } from './radio-input';
import { SelectInput } from './select-input';
import { Textarea } from './textarea';
import { TextInput } from './text-input';
import { ToggleInput } from './toggle-input';
import { DefaultInputLayout } from './base/default-input-layout';
import {
	cleanUpInputAttributes,
	composeValidators,
	addValidatorsToAttributes,
	prepareDataSet,
} from './base/utils';

// add some extra input types
HTML5_INPUT_TYPES.push( 'toggle' );

/**
 * FormInput
 * generates either an html checkbox, radio button, select, textarea,
 * or HTML5 text variant input like text, date, email, etc
 *
 * @function
 * @param {string} type
 * @param {string} htmlId
 * @param {string} htmlClass
 * @param {string} value
 * @param {Function} onChange
 * @param {Object} dataSet
 * @param {Array} options
 * @param {boolean} hasHelpText
 * @param {Function} changeListener
 * @return {string} rendered date name form row
 */
export class FormInput extends Component {
	static propTypes = {
		type: PropTypes.oneOf( HTML5_INPUT_TYPES ).isRequired,
		name: PropTypes.string.isRequired,
		htmlId: PropTypes.string.isRequired,
		htmlClass: PropTypes.string,
		value: PropTypes.oneOfType( [
			PropTypes.bool,
			PropTypes.number,
			PropTypes.string,
		] ),
		onChange: PropTypes.func,
		dataSet: PropTypes.object,
		options: PropTypes.array,
		helpText: PropTypes.string,
		helpTextID: PropTypes.string,
		InputLayout: PropTypes.object,
		changeListener: PropTypes.func,
	};

	render() {
		const {
			type,
			name,
			htmlId,
			InputLayout,
			changeListener = null,
			afterInput = null,
			...rest
		} = this.props;
		let {
			helpTextID,
			helpText = '',
			htmlClass = '',
			dataSet = {},
			validations = [],
		} = this.props;
		helpTextID = helpTextID ? helpTextID : `${ htmlId }-help-text`;
		htmlClass = this.props.required ? `${ htmlClass } required` : htmlClass;
		// ensure data attributes are properly named
		dataSet = prepareDataSet( dataSet );
		validations = Array.isArray( validations ) ? validations : [ validations ];
		// remove attributes that should not be passed to inputs
		let attributes = cleanUpInputAttributes( rest );
		// add attributes based on validations
		attributes = addValidatorsToAttributes( attributes, validations );
		// reduce validations to a single callback
		validations = composeValidators( ...validations );
		let formInput = null;
		switch ( type ) {
			case 'hidden' :
				return (
					<HiddenInput
						name={ name }
						htmlId={ htmlId }
						dataSet={ dataSet }
						validate={ validations }
						{ ...attributes }
					/>
				);
			case 'checkbox' :
				formInput = (
					<CheckboxInput
						name={ name }
						htmlId={ htmlId }
						htmlClass={ htmlClass }
						dataSet={ dataSet }
						helpTextID={ helpTextID }
						validate={ validations }
						{ ...attributes }
					/>
				);
				break;
			case 'radio' :
				formInput = (
					<RadioInput
						name={ name }
						htmlId={ htmlId }
						htmlClass={ htmlClass }
						dataSet={ dataSet }
						helpTextID={ helpTextID }
						validate={ validations }
						{ ...attributes }
					/>
				);
				break;
			case 'select' :
				delete attributes.initialValue;
				formInput = (
					<SelectInput
						name={ name }
						htmlId={ htmlId }
						htmlClass={ htmlClass }
						dataSet={ dataSet }
						helpTextID={ helpTextID }
						validate={ validations }
						{ ...attributes }
					/>
				);
				break;
			case 'textarea' :
				delete attributes.initialValue;
				formInput = (
					<Textarea
						name={ name }
						htmlId={ htmlId }
						htmlClass={ htmlClass }
						dataSet={ dataSet }
						helpTextID={ helpTextID }
						validate={ validations }
						{ ...attributes }
					/>
				);
				break;
			case 'date' :
			case 'month' :
			case 'datetime-local' :
				formInput = (
					<DateTimeInput
						name={ name }
						htmlId={ htmlId }
						htmlClass={ htmlClass }
						aria-describedby={ helpTextID }
						{ ...dataSet }
						{ ...attributes }
						{ ...validations }
					/>
				);
				break;
			case 'toggle' :
				const checked = !! attributes.initialValue;
				delete attributes.initialValue;
				delete attributes.inputWidth;
				formInput = (
					<ToggleInput
						name={ name }
						checked={ checked }
						htmlId={ htmlId }
						htmlClass={ htmlClass }
						aria-describedby={ helpTextID }
						{ ...dataSet }
						{ ...attributes }
						{ ...validations }
					/>
				);
				helpText = '';
				break;
			default :
				delete attributes.initialValue;
				formInput = (
					<TextInput
						type={ type }
						name={ name }
						htmlId={ htmlId }
						htmlClass={ htmlClass }
						dataSet={ dataSet }
						helpTextID={ helpTextID }
						validate={ validations }
						{ ...attributes }
					/>
				);
		}
		formInput = afterInput ? (
			<div className={ 'ee-after-input-wrapper' }>
				{ formInput }
				<div className={ 'ee-after-input-div' }>{ afterInput }</div>
			</div>
		) : formInput;
		const formListener = isFunction( changeListener ) ? (
			<OnChange name={ name }>
				{ changeListener }
			</OnChange>
		) : null;
		return InputLayout ? (
			<Fragment>
				<InputLayout
					inputName={ name }
					formInput={ formInput }
					helpTextID={ helpTextID }
					helpText={ helpText }
				/>
				{ formListener }
			</Fragment>
		) : (
			<Fragment>
				<DefaultInputLayout
					inputName={ name }
					formInput={ formInput }
					helpTextID={ helpTextID }
					helpText={ helpText }
				/>
				{ formListener }
			</Fragment>
		);
	}
}
