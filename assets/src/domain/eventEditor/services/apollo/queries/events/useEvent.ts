import { pathOr } from 'ramda';
import { GET_EVENT } from './';
import { Event, EventData } from '../../types';
import { ReadQueryOptions } from '../types';
import useCacheQuery from '../useCacheQuery';
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

	return pathOr<Event>(null, ['espressoEventBy'], data);
};

export default useEvent;
