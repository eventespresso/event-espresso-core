/**
 * External imports
 */
import PropTypes from 'prop-types';
import { useMemo } from '@wordpress/element';
import { twoColumnAdminFormLayout } from '@eventespresso/components';

const { FormCancelButton } = twoColumnAdminFormLayout;
const nullFunc = () => true;

/**
 * @function
 * @param {Function} closeEditor
 * @param {Function} processChanges
 * @return {Object} rendered submit button
 */
const CancelTicketAssignmentsButton = ( {
	closeEditor = nullFunc,
	beforeEditorClose = nullFunc,
} ) => {
	return useMemo( () => (
		<FormCancelButton
			onClick={ ( click ) => {
				if ( beforeEditorClose() ) {
					closeEditor( click );
				}
			} }
		/>
	), [ beforeEditorClose ] );
};

CancelTicketAssignmentsButton.propTypes = {
	closeEditor: PropTypes.func,
	beforeEditorClose: PropTypes.func,
};

export default CancelTicketAssignmentsButton;
