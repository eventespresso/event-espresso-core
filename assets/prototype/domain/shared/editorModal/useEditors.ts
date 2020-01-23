import useAddDatetimeModal from '../../eventEditor/datetimes/useAddDatetimeModal';
import useEditDatetimeModal from '../../eventEditor/datetimes/useEditDatetimeModal';
import { EditorModalCallback } from '../../../application/ui/components/layout/eeditorModal';
import { EditorModals } from './';

const useEditorModals = (): EditorModals => {
	const addDatetime: EditorModalCallback = useAddDatetimeModal();
	const editDatetime: EditorModalCallback = useEditDatetimeModal();

	return {
		addDatetime,
		editDatetime,
	};
};

export default useEditorModals;
