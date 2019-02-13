/**
 * External imports
 */
import { __ } from '@eventespresso/i18n';
import { Button } from '@wordpress/components';

/**
 * @function
 * @param {Function} onClick
 * @param {boolean} submitting
 * @param {boolean} pristine
 * @param {string} buttonText
 * @param {string} htmlId
 * @param {string} htmlClass
 * @return {Object} rendered submit button for form
 */
export const FormCancelButton = ( {
	onClick,
	pristine,
	submitting,
	buttonText = '',
	htmlId = '',
	htmlClass = '',
} ) => {
	buttonText = buttonText ? buttonText : __( 'Cancel', 'event_espresso' );
	htmlClass = htmlClass ?
		`${ htmlClass } ee-form-button-cancel ee-form-button` :
		'ee-form-button-cancel ee-form-button';
	return (
		<Button
			isDefault
			onClick={ onClick }
			disabled={ submitting || pristine }
			id={ htmlId }
			className={ htmlClass }
		>
			{ buttonText }
		</Button>
	);
};
