/**
 * External imports
 */
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * generates unique modal editor identifier for
 * ticket assignment managers based on the supplied entities
 *
 * @param {BaseEntity} eventDate
 * @param {BaseEntity} ticket
 * @param {BaseEntity[]} allDates
 * @param {BaseEntity[]} allTickets
 * @return {string} editor id for ticket
 */
const useTicketAssignmentsEditorId = (
	eventDate = null,
	ticket = null,
	allDates = [],
	allTickets = [],
) => {
	let editorId = 'ticket-assignments-manager';
	editorId += isModelEntityOfModel( eventDate, 'datetime' ) ?
		'-' + eventDate.id :
		'-0';
	editorId += isModelEntityOfModel( ticket, 'ticket' ) ?
		'-' + ticket.id :
		'-0';
	editorId += '-' + allDates.length;
	editorId += '-' + allTickets.length;
	return editorId !== 'ticket-assignments-manager-0-0-0-0' ?
		editorId :
		'';
};

export default useTicketAssignmentsEditorId;
