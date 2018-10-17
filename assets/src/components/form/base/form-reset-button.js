/**
 * External imports
 */
import { __ } from '@eventespresso/i18n';

/**
 * @function
 * @param {Function} onClick
 * @param {boolean} submitting
 * @param {boolean} pristine
 * @param {string} buttonText
 * @return {Object} rendered submit button for form
 */
export const FormResetButton = ( {
	onClick,
	pristine,
	submitting,
	buttonText = '',
} ) => {
	buttonText = buttonText ? buttonText : __( 'Reset', 'event_espresso' );
	return (
		<button
			type="button"
			onClick={ onClick }
			className="button button-secondary"
			disabled={ submitting || pristine }
		>
			{ buttonText }
		</button>
	);
};
