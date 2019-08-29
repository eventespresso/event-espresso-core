/**
 * External imports
 */
import PropTypes from 'prop-types';
import { useMemo, useState } from '@wordpress/element';
import { twoColumnAdminFormLayout } from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';

/**
 * Internal imports
 */
import { useProcessTicketAssignments } from './hooks';

const { FormSubmitButton } = twoColumnAdminFormLayout;
const nullFunc = () => true;

/**
 * @param {Object} assignedState
 * @param {boolean} hasNoAssignments
 * @param {Function} beforeEditorClose
 * @param {Function} closeEditor
 * @param {boolean} disabled
 * @return {Object} rendered submit button
 */
const SubmitTicketAssignmentsButton = ( {
	assignedState,
	hasNoAssignments,
	beforeEditorClose = nullFunc,
	closeEditor = nullFunc,
	disabled = false,
} ) => {
	const [ submitting, setSubmitting ] = useState( false );
	const processChanges = useProcessTicketAssignments( {
		hasNoAssignments,
		assignedState,
		setSubmitting,
		beforeEditorClose,
		closeEditor,
	} );
	return useMemo( () => (
		<FormSubmitButton
			onClick={ ( click ) => {
				processChanges( click );
			} }
			buttonText={ __(
				'Update Ticket Assignments',
				'event_espresso'
			) }
			submitting={ submitting }
			disabled={ disabled }
		/>
	), [ assignedState, processChanges, submitting, disabled ] );
};

SubmitTicketAssignmentsButton.propTypes = {
	assignedState: PropTypes.shape( {
		assigned: PropTypes.object.isRequired,
		removed: PropTypes.object.isRequired,
	} ).isRequired,
	hasNoAssignments: PropTypes.bool.isRequired,
	closeEditor: PropTypes.func.isRequired,
	beforeEditorClose: PropTypes.func,
	disabled: PropTypes.bool,
};

export default SubmitTicketAssignmentsButton;
