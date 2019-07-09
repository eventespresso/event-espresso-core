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
export const generateFormInputFromConfig = (
	formDataKeyPrefix,
	formDataValues,
	inputConfig
) => {
	if ( ! inputConfig.id ) {
		return null;
	}
	const config = { ...defaultInputConfig, ...inputConfig };
	const name = `${ formDataKeyPrefix }-${ config.id }`;
	return config.type === 'toggle' ? (
		<FormInput
			key={ config.id }
			type={ config.type }
			name={ name }
			htmlId={ name }
			label={ config.label }
			initialValue={ formDataValues[ name ] || config.default }
			changeListener={ config.changeListener }
			validations={ config.validations }
			required={ config.required }
			disabled={ config.disabled }
			minLength={ config.minLength }
			min={ config.min }
			inputWidth={ config.inputWidth }
			helpTextIfChecked={ config.helpText.ifChecked }
			helpTextIfNotChecked={ config.helpText.ifNotChecked }
			afterInput={ config.afterInput }
		/>
	) : (
		<FormInput
			key={ config.id }
			type={ config.type }
			name={ name }
			htmlId={ name }
			label={ config.label }
			initialValue={ formDataValues[ name ] || config.default }
			changeListener={ config.changeListener }
			validations={ config.validations }
			disabled={ config.disabled }
			required={ config.required }
			minLength={ config.minLength }
			min={ config.min }
			step={ config.step }
			inputWidth={ config.inputWidth }
			helpText={ config.helpText.regular }
			afterInput={ config.afterInput }
		/>
	);
};
