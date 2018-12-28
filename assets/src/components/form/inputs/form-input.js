/**
 * External imports
 */
import { isArray } from 'lodash';
import PropTypes from 'prop-types';
import { Component, Fragment } from 'react';

/**
 * Internal imports
 */
import { HTML5_INPUT_TYPES } from './base/constants';
import { CheckboxInput } from './checkbox-input';
import { RadioInput } from './radio-input';
import { SelectInput } from './select-input';
import { Textarea } from './textarea';
import { TextInput } from './text-input';
import { InputError } from './base/input-error';
import { InputHelpText } from './base/input-help-text';
import {
	cleanUpInputAttributes,
	composeValidators,
	addValidatorsToAttributes,
	prepareDataSet,
} from './base/utils';

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
 * @return {string} rendered date name form row
 */
export class FormInput extends Component {
	static propTypes = {
		type: PropTypes.oneOf( HTML5_INPUT_TYPES ).isRequired,
		name: PropTypes.string,
		htmlId: PropTypes.string.isRequired,
		htmlClass: PropTypes.string,
		value: PropTypes.oneOfType( [
			PropTypes.number,
			PropTypes.string,
		] ),
		onChange: PropTypes.func,
		dataSet: PropTypes.object,
		options: PropTypes.array,
		helpText: PropTypes.string,
		helpTextID: PropTypes.string,
	};

	render() {
		const {
			type,
			name,
			htmlId,
			helpText = '',
			...rest
		} = this.props;
		let {
			helpTextID,
			htmlClass = '',
			dataSet = {},
			validations = [],
		} = this.props;
		helpTextID = helpTextID ? helpTextID : `${ htmlId }-help-text`;
		htmlClass = this.props.required ? `${ htmlClass } required` : htmlClass;
		// ensure data attributes are properly named
		dataSet = prepareDataSet( dataSet );
		validations = isArray( validations ) ? validations : [ validations ];
		// remove attributes that should not be passed to inputs
		let attributes = cleanUpInputAttributes( rest );
		// add attributes based on validations
		attributes = addValidatorsToAttributes( attributes, validations );
		// reduce validations to a single callback
		validations = composeValidators( ...validations );

		let formInput = null;
		switch ( type ) {
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
		return formInput && (
			<Fragment>
				{ formInput }
				<InputError inputName={ name } />
				<InputHelpText
					helpTextID={ helpTextID }
					helpText={ helpText }
				/>
			</Fragment>
		);
	}
}
