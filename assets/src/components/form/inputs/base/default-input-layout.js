/**
 * External imports
 */
import { Fragment } from '@wordpress/element';

/**
 * Internal imports
 */
import InputError from './input-error';
import InputHelpText from './input-help-text';

/**
 * Basic form input layout where input is followed by input error and help text
 *
 * @function
 * @param {Object} formInput
 * @param {string} inputName
 * @param {string} helpTextID
 * @param {string} helpText
 * @return {Object} rendered form input
 */
const DefaultInputLayout = ( {
	formInput,
	inputName,
	helpTextID,
	helpText,
} ) => {
	return formInput && (
		<Fragment>
			{ formInput }
			<InputError inputName={ inputName } />
			<InputHelpText
				helpTextID={ helpTextID }
				helpText={ helpText }
			/>
		</Fragment>
	);
};

export default DefaultInputLayout;
