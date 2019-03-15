/**
 * External imports
 */
import { Fragment } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';

/**
 * Internal imports
 */
import { SubmittingNotice } from './submitting-notice';
import { FancyButton } from '../../ui';

/**
 * @function
 * @param {boolean} submitting
 * @param {boolean} disabled
 * @param {string} buttonText
 * @param {string} submittingText
 * @param {string} htmlId
 * @param {string} htmlClass
 * @param {string} noticeClass
 * @param {Object} buttonProps
 * @return {Object} rendered submit button for form
 */
export const FormSubmitButton = ( {
	submitting,
	disabled,
	buttonText = '',
	submittingText = '',
	htmlId = '',
	htmlClass = '',
	noticeClass = '',
	...buttonProps
} ) => {
	buttonText = buttonText ? buttonText : __( 'Submit', 'event_espresso' );
	htmlClass = htmlClass ?
		`${ htmlClass } ee-form-button-submit ee-form-button` :
		'ee-form-button-submit ee-form-button';
	return (
		<Fragment>
			<SubmittingNotice
				submitting={ submitting }
				submittingText={ submittingText }
				htmlClass={ noticeClass }
			/>
			<FancyButton
				type="submit"
				buttonText={ buttonText }
				disabled={ submitting || disabled }
				id={ htmlId }
				htmlClass={ htmlClass }
				icon={ 'save' }
				{ ...buttonProps }
			/>
		</Fragment>
	);
};
