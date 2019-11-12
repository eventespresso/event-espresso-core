/**
 * External imports
 */
import { __ } from '@eventespresso/i18n';
/**
 * Internal imports
 */
import SubmittingNotice from '../../base/submitting-notice';

/**
 * Renders the submitting spinner
 *
 * @function
 * @param {Object} props
 * @return {Object} rendered spinner
 */
export default ( props ) => {
	return (
		<SubmittingNotice
			submittingText={ __( 'saving', 'event_espresso' ) }
			{ ...props }
		/>
	);
};
