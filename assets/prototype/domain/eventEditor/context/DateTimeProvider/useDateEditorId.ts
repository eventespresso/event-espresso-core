/**
 * Internal dependencies
 */
import { EntityId } from '../../data/types';
import { EditorId } from '../../../../application/ui/components/layout/editor-modal/useEditorModalState/types';

/**
 * Function that returns editor id for a given event date
 */
const useDateEditorId = (prefix = 'datetime-editor', datetimeId: EntityId): EditorId => {
	return prefix !== '' ? `${prefix}-${datetimeId}` : `datetime-editor-${datetimeId}`;
};

export default useDateEditorId;
