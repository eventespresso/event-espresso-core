/**
 * External imports
 */
import PropTypes from 'prop-types';
import { useMemo, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { twoColumnAdminFormLayout } from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';
import { applyQueryString } from '@eventespresso/model';

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
	beforeEditorClose = nullFunc,
	closeEditor = nullFunc,
	dateEntity,
	disabled = false,
	hasNoAssignments,
} ) => {
	const [ submitting, setSubmitting ] = useState( false );
	const processChanges = useProcessTicketAssignments( {
		hasNoAssignments,
		assignedState,
		setSubmitting,
		beforeEditorClose,
		closeEditor,
	} );
	const onClick = async () => {
		const { forPersist, id, isNew, modelName } = dateEntity;
		const path = applyQueryString( modelName );
		const request = {
			path: isNew ? path : path + '/' + id,
			method: isNew ? 'POST' : 'PUT',
			data: forPersist,
		};

		try {
			processChanges();
			await apiFetch( request );
		} catch ( e ) {
			/**
			 * handle error with smth like:
			 * https://github.com/WordPress/gutenberg/tree/master/packages/components/src/notice
			 */
		}
	};

	return useMemo( () => (
		<FormSubmitButton
			onClick={ onClick }
			buttonText={ __(
				'Updating Ticket Assignments AND CREATE EVENT DATE NOW !!!',
				'event_espresso'
			) }
			submitting={ submitting }
			submittingText={ __(
				'Updating Ticket Assignments',
				'event_espresso'
			) }
			disabled={ disabled }
		/>
	), [
		assignedState,
		hasNoAssignments,
		processChanges,
		submitting,
		disabled,
	] );
};

SubmitTicketAssignmentsButton.propTypes = {
	assignedState: PropTypes.shape( {
		assigned: PropTypes.object.isRequired,
		removed: PropTypes.object.isRequired,
	} ).isRequired,
	beforeEditorClose: PropTypes.func,
	closeEditor: PropTypes.func.isRequired,
	dateEntity: PropTypes.object,
	disabled: PropTypes.bool,
	hasNoAssignments: PropTypes.bool.isRequired,
};

export default SubmitTicketAssignmentsButton;
