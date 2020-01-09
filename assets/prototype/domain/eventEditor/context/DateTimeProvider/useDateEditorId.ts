/**
 * Internal dependencies
 */
import { EntityId } from '../../data/types';

/**
 * Function that returns editor id for a given event date
 */
const useDateEditorId = (dateId: EntityId, prefix: string = ''): string => {
	const editorId: string = `event-date-editor-${dateId}`;
	return prefix !== '' ? `${prefix}-${editorId}` : editorId;
};

export default useDateEditorId;
