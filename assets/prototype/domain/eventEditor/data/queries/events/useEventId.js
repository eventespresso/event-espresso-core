import { useContext } from 'react';
import { EventEditorEventIdContext } from '../../../context/EventEditorEventIdProvider';

const useEventId = () => {
	return useContext(EventEditorEventIdContext);
};

export default useEventId;
