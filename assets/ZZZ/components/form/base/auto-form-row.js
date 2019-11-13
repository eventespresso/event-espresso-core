/**
 * Internal imports
 */
import { addValidatorsToAttributes } from '../inputs/base/utils';
import InputLabel from '../inputs/base/input-label';

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
 * @param {Object} AutoColumnRow form layout strategy row component
 * @return {Object} rendered form row
 */
const AutoFormRow = ( {
	FormElement,
	AutoColumnRow,
} ) => {
	let label = null;
	let input = null;
	let row = null;
	if ( FormElement && FormElement.type && FormElement.type.name ) {
		const name = FormElement.type.name;
		if (
			name !== 'InputLabel' &&
			name !== 'FormInput' &&
			name !== 'Field'
		) {
			return FormElement;
		}
		if ( name === 'InputLabel' ) {
			label = FormElement;
		} else {
			input = FormElement;
			const validations = Array.isArray( FormElement.props.validations ) ?
				FormElement.props.validations :
				[ FormElement.props.validations ];
			const attributes = addValidatorsToAttributes(
				{ ...FormElement.props },
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
		if ( label && input ) {
			row = (
				<AutoColumnRow>
					{ label }
					{ input }
				</AutoColumnRow>
			);
			return row;
		}
	}
	return FormElement;
};

export default AutoFormRow;
