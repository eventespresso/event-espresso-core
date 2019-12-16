import { useContext } from 'react';
import { EventEditorEventIdContext } from '../../../../../application/services/context/EventEditorEventIdProvider';

const useEventId = () => {
	const eventId = useContext(EventEditorEventIdContext);

	return eventId;
};

export default useEventId;
