/**
 * External imports
 */
import { findIndex } from 'lodash';
import PropTypes from 'prop-types';

/**
 * Internal imports
 */
import { isAssigned, isRemoved } from './assign-remove-tickets';

const noIndex = -1;

/**
 * callback that determines whether the supplied date
 * already has a relation to the supplied ticket,
 * or is queued for removal, or has been assigned
 *
 * @param {number|string} dateId
 * @param {number|string} ticketId
 * @param {BaseEntity[]} dateTicketEntities
 * @param {Object} assignedState - { assigned, removed }
 * @return {Object} JSON object with hasTicket, isAssigned, isRemoved values
 */
const determineCurrentAssignment = ( {
	dateId,
	ticketId,
	dateTicketEntities,
	assignedState,
} ) => {
	return {
		hasTicket: findIndex(
			dateTicketEntities,
			( ticket ) => ticket.id === ticketId
		) > noIndex,
		isAssigned: isAssigned(
			assignedState.assigned,
			dateId,
			ticketId,
			true
		) > noIndex,
		isRemoved: isRemoved(
			assignedState.removed,
			dateId,
			ticketId,
			true
		) > noIndex,
	};
};

determineCurrentAssignment.propTypes = {
	dateId: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ).isRequired,
	ticketId: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ).isRequired,
	dateTicketEntities: PropTypes.arrayOf(
		PropTypes.object
	).isRequired,
	assignedState: PropTypes.shape( {
		assigned: PropTypes.object,
		removed: PropTypes.object,
	} ).isRequired,
};

export default determineCurrentAssignment;
