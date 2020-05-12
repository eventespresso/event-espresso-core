import { Event, EventData } from '../../types';
import { useCacheQuery } from '@dataServices/apollo/queries';
import useEventQueryOptions from './useEventQueryOptions';

const useEvent = (): Event => {
	const options = useEventQueryOptions();

	const { data } = useCacheQuery<EventData>({ ...options, fetchPolicy: 'cache-first' });

	return data?.espressoEvent;
};

export default useEvent;
