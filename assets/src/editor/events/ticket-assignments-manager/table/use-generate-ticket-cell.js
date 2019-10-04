/**
 * External imports
 */
import PropTypes from 'prop-types';
import { useCallback } from '@wordpress/element';

import ToggleTicketAssignmentButton from '../toggle-ticket-assignment-button';
import { getAssignmentsErrorClass } from '../utils';

/**
 * @function
 * @param {Object} assignedState - { assigned, removed }
 * @param {Object} assignmentCounts - { assigned, removed }
 * @param {boolean} hasNoAssignments
 * @param {Function} setAssignedState
 * @return {Function} callback for rendering table cell
 */
const useGenerateTicketCell = ( {
	assignedState,
	assignmentCounts,
	hasNoAssignments,
	setAssignedState,
} ) => {
	return useCallback( ( dateId, ticketId, dateTicketEntities ) => {
		const assignmentsErrorClass = getAssignmentsErrorClass( {
			dateId,
			ticketId,
			hasNoAssignments,
			assignmentCounts,
		} );
		return {
			key: `tam-ticket-cell-${ dateId }-${ ticketId }`,
			type: 'cell',
			class: `ee-tam-date-row-ticket${ assignmentsErrorClass }`,
			value: (
				<ToggleTicketAssignmentButton
					dateId={ dateId }
					ticketId={ ticketId }
					dateTicketEntities={ dateTicketEntities }
					assignedState={ assignedState }
					setAssignedState={ setAssignedState }
				/>
			),
		};
	}, [
		assignedState,
		assignmentCounts,
		hasNoAssignments,
		setAssignedState,
	] );
};

useGenerateTicketCell.propTypes = {
	assignedState: PropTypes.shape( {
		assigned: PropTypes.object,
		removed: PropTypes.object,
	} ).isRequired,
	assignmentCounts: PropTypes.shape( {
		assigned: PropTypes.number,
		removed: PropTypes.number,
	} ).isRequired,
	hasNoAssignments: PropTypes.bool.isRequired,
	setAssignedState: PropTypes.func.isRequired,
};

export default useGenerateTicketCell;
