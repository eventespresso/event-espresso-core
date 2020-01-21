/**
 * Internal dependencies
 */
import { EntityId } from '../../data/types';
import { EditorId } from '../../../../application/ui/components/layout/editorModal/useEditorModalState/types';

/**
 * @function
 * @param {Object} ticket
 * @param {string} prefix
 * @return {string} editor id for ticket
 */
const useTicketEditorId = (prefix: string = 'ticket-editor', ticketId: EntityId): EditorId => {
	return prefix !== '' ? `${prefix}-${ticketId}` : `ticket-editor-${ticketId}`;
};

export default useTicketEditorId;
