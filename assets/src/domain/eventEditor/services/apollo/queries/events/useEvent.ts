import { GET_EVENT } from './';
import { Event, EventData } from '../../types';
import { useCacheQuery, ReadQueryOptions } from '@dataServices/apollo/queries';
import useEventId from './useEventId';

const useEvent = (): Event => {
	const id = useEventId();
	const options: ReadQueryOptions = {
		query: GET_EVENT,
		variables: {
			id,
		},
	};
	const { data } = useCacheQuery<EventData>({ ...options, fetchPolicy: 'cache-first' });

	return data?.espressoEventBy;
};

export default useEvent;
