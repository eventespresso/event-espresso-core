import { useContext } from 'react';
import { EventIdContext } from '@edtrServices/context/EventContext';

const useEventId = (): number => {
	return useContext(EventIdContext);
};

export default useEventId;
