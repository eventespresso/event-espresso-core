/**
 * Internal dependencies
 */
import { EntityId } from '../../data/types';

/**
 * @function
 * @param {Object} ticket
 * @param {string} prefix
 * @return {string} editor id for ticket
 */
const useTicketEditorId = (prefix: string = '', ticketId: EntityId): string => {
	const editorId: string = `ticket-editor-${ticketId}`;

	return prefix !== '' ? `${prefix}-${editorId}` : editorId;
};

export default useTicketEditorId;
