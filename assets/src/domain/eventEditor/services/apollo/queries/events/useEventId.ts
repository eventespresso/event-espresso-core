import { useContext } from 'react';
import { EventEditorEventIdContext } from '../../../context/EventContext';

const useEventId = (): number => {
	return useContext(EventEditorEventIdContext);
};

export default useEventId;
