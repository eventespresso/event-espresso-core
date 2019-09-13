/**
 * External imports
 */
import PropTypes from 'prop-types';
import warning from 'warning';
import { useCallback } from '@wordpress/element';
import { isModelEntityOfModel } from '@eventespresso/validators';

import useGenerateDateHeader from './use-generate-date-header';
import useGenerateTicketCell from './use-generate-ticket-cell';

/**
 * @param {number} dateCount
 * @param {BaseEntity[]} ticketEntities
 * @param {Object} ticketDateMap
 * @param {Object} assignedState - { assigned, removed }
 * @param {Object} assignmentCounts - { assigned, removed }
 * @param {boolean} hasNoAssignments
 * @param {Function} setAssignedState
 * @return {Function} callback for generating date row
 */
const useGenerateDateRow = (
	dateCount,
	ticketEntities,
	ticketDateMap,
	assignedState,
	assignmentCounts,
	hasNoAssignments,
	setAssignedState,
) => {
	const dateHeader = useGenerateDateHeader();
	const ticketCell = useGenerateTicketCell( {
		assignedState,
		assignmentCounts,
		hasNoAssignments,
		setAssignedState,
	} );
	return useCallback(
		/**
		 * @function
		 * @param {BaseEntity} eventDate
		 * @return {Array} array of row data
		 */
		( eventDate ) => {
			const rowData = [
				{
					type: 'row',
					class: 'ee-tam-date-row',
					value: '',
				},
			];
			if ( dateCount > 1 ) {
				rowData.push( dateHeader( eventDate ) );
			}
			const dateTicketEntities = isModelEntityOfModel( eventDate, 'datetime' ) &&
				ticketDateMap[ eventDate.id ] ?
				ticketDateMap[ eventDate.id ] :
				[];
			for ( let x = 0; x < ticketEntities.length; x++ ) {
				const ticket = ticketEntities[ x ];
				warning(
					isModelEntityOfModel( ticket, 'ticket' ),
					'Invalid EE Ticket model object!'
				);
				rowData.push(
					ticketCell( eventDate.id, ticket.id, dateTicketEntities )
				);
			}
			return rowData;
		},
		[
			dateCount,
			ticketEntities,
			ticketDateMap,
			assignedState,
			setAssignedState,
		]
	);
};

useGenerateDateRow.propTypes = {
	dateCount: PropTypes.number.isRequired,
	eventDate: PropTypes.object.isRequired,
	ticketEntities: PropTypes.arrayOf(
		PropTypes.object
	).isRequired,
	ticketDateMap: PropTypes.object,
	assignedState: PropTypes.shape( {
		assigned: PropTypes.object,
		removed: PropTypes.object,
	} ).isRequired,
	assignmentCounts: PropTypes.shape( {
		dates: PropTypes.object,
		tickets: PropTypes.object,
	} ).isRequired,
	hasNoAssignments: PropTypes.bool.isRequired,
	setAssignedState: PropTypes.func.isRequired,
};

export default useGenerateDateRow;
