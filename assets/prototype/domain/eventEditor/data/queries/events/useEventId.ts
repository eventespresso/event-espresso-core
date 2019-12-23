import { useContext } from 'react';
import { EventEditorEventIdContext } from '../../../context/EventEditorEventIdProvider';

const useEventId = (): number => {
	return useContext(EventEditorEventIdContext);
};

export default useEventId;
