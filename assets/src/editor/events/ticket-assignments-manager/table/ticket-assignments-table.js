/**
 * External imports
 */
import PropTypes from 'prop-types';
import { ResponsiveTable } from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';

import useDateRows from './use-date-rows';
import useTicketHeaders from './use-ticket-headers';

/**
 * @param {number} dateCount
 * @param {BaseEntity[]} dateEntities
 * @param {number} ticketCount
 * @param {BaseEntity[]} ticketEntities
 * @param {Object} ticketDateMap
 * @param {Object} assignedState
 * @param {Object} assignmentCounts
 * @param {boolean} hasNoAssignments
 * @param {Function} setAssignedState
 * @return {Object} rendered ticket assignments table
 */
const TicketAssignmentsTable = ( {
	dateCount,
	dateEntities,
	ticketCount,
	ticketEntities,
	ticketDateMap,
	assignedState,
	assignmentCounts,
	hasNoAssignments,
	setAssignedState,
} ) => {
	const ticketHeaders = useTicketHeaders( { dateCount, ticketEntities } );
	const dateRows = useDateRows( {
		dateCount,
		dateEntities,
		ticketEntities,
		ticketDateMap,
		assignedState,
		assignmentCounts,
		hasNoAssignments,
		setAssignedState,
	} );
	return dateCount > 0 && ticketCount > 0 ? (
		<ResponsiveTable
			columns={ ticketHeaders }
			rowData={ dateRows }
			metaData={ {
				tableCaption: __(
					'Ticket Assignments',
					'event_espresso'
				),
				hasRowHeaders: dateCount > 1,
			} }
			classes={ {
				tableClass: 'ee-ticket-assignments-manager',
			} }
		/>
	) : null;
};

TicketAssignmentsTable.propTypes = {
	dateCount: PropTypes.number.isRequired,
	dateEntities: PropTypes.arrayOf(
		PropTypes.object
	).isRequired,
	ticketCount: PropTypes.number.isRequired,
	ticketEntities: PropTypes.arrayOf(
		PropTypes.object
	).isRequired,
	ticketDateMap: PropTypes.object.isRequired,
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

export default TicketAssignmentsTable;
