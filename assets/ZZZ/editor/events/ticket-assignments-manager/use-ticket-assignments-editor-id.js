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
 * @param {string} prefix
 * @return {string} editor id for ticket
 */
const useTicketAssignmentsEditorId = (
	eventDate = null,
	ticket = null,
	allDates = [],
	allTickets = [],
	prefix = ''
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
	editorId = editorId !== 'ticket-assignments-manager-0-0-0-0' ?
		editorId :
		'';
	return prefix !== '' && editorId !== '' ?
		`${ prefix }-${ editorId }` :
		editorId;
};

export default useTicketAssignmentsEditorId;
