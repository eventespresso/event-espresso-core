/**
 * External imports
 */
import { Fragment } from 'react';
import { __ } from '@eventespresso/i18n';
import { Button } from '@wordpress/components';

/**
 * Internal imports
 */
import './form-submit-button.css';

/**
 * @function
 * @param {boolean} submitting
 * @param {boolean} disabled
 * @param {string} buttonText
 * @param {string} submittingText
 * @param {string} htmlId
 * @param {string} htmlClass
 * @return {Object} rendered submit button for form
 */
export const FormSubmitButton = ( {
	submitting,
	disabled,
	buttonText = '',
	submittingText = '',
	htmlId = '',
	htmlClass = '',
} ) => {
	buttonText = buttonText ? buttonText : __( 'Submit', 'event_espresso' );
	submittingText = submittingText ?
		submittingText :
		__( 'submitting', 'event_espresso' );
	const submittingNotice = submitting ?
		<p className="ee-form-submitting-notice">
			<span className="ee-ellipsis-span">{ submittingText }</span>
		</p> :
		null;
	htmlClass = htmlClass ?
		`${ htmlClass } ee-form-button-submit ee-form-button` :
		'ee-form-button-submit ee-form-button';
	return (
		<Fragment>
			{
				submittingNotice ||
				<Button
					isPrimary
					type="submit"
					disabled={ submitting || disabled }
					id={ htmlId }
					className={ htmlClass }
				>
					{ buttonText }
				</Button>
			}
		</Fragment>
	);
};
