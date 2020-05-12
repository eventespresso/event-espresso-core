import useEventId from '../events/useEventId';
import { GET_EVENT } from './queries';
import { ReadQueryOptions } from '@dataServices/apollo/queries';

const useEventQueryOptions = (): ReadQueryOptions => {
	const id = useEventId();
	const options: ReadQueryOptions = {
		query: GET_EVENT,
		variables: {
			id,
		},
	};

	return options;
};

export default useEventQueryOptions;
