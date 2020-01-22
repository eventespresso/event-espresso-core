import useAddDatetimeModal from '../../eventEditor/datetimes/useAddDatetimeModal';
import useEditDatetimeModal from '../../eventEditor/datetimes/useEditDatetimeModal';
import { EditorModalData, EntityId } from '../../../application/ui/components/layout/eeditorModal';
import { EditorModals } from './';

const useEditorModals = (entityId: EntityId): EditorModals => {
	const addDatetime: EditorModalData = useAddDatetimeModal();
	const editDatetime: EditorModalData = useEditDatetimeModal(entityId);

	return {
		addDatetime,
		editDatetime,
	};
};

export default useEditorModals;
