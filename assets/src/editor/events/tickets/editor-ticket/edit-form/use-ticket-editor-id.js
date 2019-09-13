/**
 * External imports
 */
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * @function
 * @param {Object} ticket
 * @return {string} editor id for ticket
 */
const useTicketEditorId = ( ticket ) => (
	isModelEntityOfModel( ticket, 'ticket' ) ?
		`ticket-editor-${ ticket.id }` :
		''
);

export default useTicketEditorId;
