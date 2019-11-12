/**
 * External imports
 */
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * @function
 * @param {Object} ticket
 * @param {string} prefix
 * @return {string} editor id for ticket
 */
const useTicketEditorId = ( ticket, prefix = '' ) => {
	const editorId = isModelEntityOfModel( ticket, 'ticket' ) ?
		`ticket-editor-${ ticket.id }` :
		'';
	return prefix !== '' && editorId !== '' ?
		`${ prefix }-${ editorId }` :
		editorId;
};

export default useTicketEditorId;
