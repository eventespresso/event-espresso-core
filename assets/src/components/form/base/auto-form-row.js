/**
 * External imports
 */
import { Component } from 'react';
import { isArray } from 'lodash';

/**
 * Internal imports
 */
import { mapValidatorsToAttributes } from '../inputs/base/utils';

/**
 * AutoFormRow
 * This component determines whether the incoming form element
 * is an input, label, or row component and responds accordingly.
 * FormRow components from a form layout strategy will simply be
 * returned as is, since they require no further manipulation.
 * Inputs and Labels will be passed to the supplied form layout
 * strategy AutoColumnRow component for further processing.
 * If a Label component is not provided but the supplied Input
 * has a "label" prop, then that will be used to generate an
 * InputLabel using the supplied form layout strategy component.
 *
 * @component
 * @param {Object} FormElement either an input, label, or form row component
 * @param {Object} InputLabel form layout strategy label display component
 * @param {Object} AutoColumnRow form layout strategy row component
 * @return {Object} rendered form row
 */
export class AutoFormRow extends Component {
	render() {
		const {
			FormElement,
			InputLabel,
			AutoColumnRow,
		} = this.props;

		let label = null;
		let input = null;
		let row = null;
		if ( FormElement.type ) {
			const name = FormElement.type.name;
			if ( name === 'FormRow' ) {
				return FormElement;
			}
			if ( name === 'InputLabel' ) {
				label = FormElement;
			}
			if ( name === 'FormInput' || name === 'Field' ) {
				input = FormElement;
				const validations = isArray( FormElement.props.validations ) ?
					FormElement.propsvalidations :
					[ FormElement.props.validations ];
				let attributes = Object.assign( {}, FormElement.props );
				attributes = mapValidatorsToAttributes(
					attributes,
					validations
				);
				if ( attributes.label ) {
					const required = attributes.required ?
						attributes.required :
						false;
					label = (
						<InputLabel
							htmlFor={ attributes.htmlId }
							label={ attributes.label }
							required={ required }
						/>
					);
				}
			}
		}
		if ( label && input ) {
			row = (
				<AutoColumnRow>
					{ label }
					{ input }
				</AutoColumnRow>
			);
			label = null;
			input = null;
			return row;
		}
		return null;
	}
}
