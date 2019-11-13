/**
 * Internal imports
 */
import { FormInput } from '@eventespresso/components';

const defaultInputConfig = {
	id: null,
	type: 'text',
	label: null,
	default: null,
	changeListener: null,
	validations: () => {},
	required: false,
	disabled: false,
	minLength: null,
	min: null,
	inputWidth: null,
	helpText: {
		regular: null,
		ifChecked: null,
		ifNotChecked: null,
	},
	afterInput: null,
	step: null,
};

/**
 * returns a rendered FormInput component based on the provided config object
 *
 * @function
 * @param {string} formDataKeyPrefix  string prepended to form data keys
 * @param {Object} formDataValues form input values
 * @param {Object} inputConfig input generation details
 * @return {Array} form inputs
 */
const generateFormInputFromConfig = (
	formDataKeyPrefix,
	formDataValues,
	inputConfig
) => {
	if ( ! inputConfig.id ) {
		return null;
	}
	const config = { ...defaultInputConfig, ...inputConfig };

	const {
		id,
		type,
		label,
		default: defaultValue,
		changeListener,
		validations,
		required,
		disabled,
		minLength,
		min,
		step,
		inputWidth,
		helpText: {
			ifChecked,
			ifNotChecked,
			regular,
		},
		afterInput,
		...rest
	} = config;

	const name = `${ formDataKeyPrefix }-${ id }`;

	return type === 'toggle' ? (
		<FormInput
			key={ id }
			type={ type }
			name={ name }
			htmlId={ name }
			label={ label }
			initialValue={ formDataValues[ name ] || defaultValue }
			changeListener={ changeListener }
			validations={ validations }
			required={ required }
			disabled={ disabled }
			minLength={ minLength }
			min={ min }
			inputWidth={ inputWidth }
			helpTextIfChecked={ ifChecked }
			helpTextIfNotChecked={ ifNotChecked }
			afterInput={ afterInput }
			{ ...rest }
		/>
	) : (
		<FormInput
			key={ id }
			type={ type }
			name={ name }
			htmlId={ name }
			label={ label }
			initialValue={ formDataValues[ name ] || defaultValue }
			changeListener={ changeListener }
			validations={ validations }
			disabled={ disabled }
			required={ required }
			minLength={ minLength }
			min={ min }
			step={ step }
			inputWidth={ inputWidth }
			helpText={ regular }
			afterInput={ afterInput }
			{ ...rest }
		/>
	);
};

export default generateFormInputFromConfig;
