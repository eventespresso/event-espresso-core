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
 * @param {string} buttonText
 * @param {string} submittingText
 * @return {Object} rendered submit button for form
 */
export const FormSubmitButton = ( {
	submitting,
	buttonText = '',
	submittingText = '',
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
	return (
		<Fragment>
			{
				submittingNotice ||
				<Button
					isPrimary
					type="submit"
					disabled={ submitting }
				>
					{ buttonText }
				</Button>
			}
		</Fragment>
	);
};
