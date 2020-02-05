import useEventId from '../events/useEventId';
import { GET_DATETIMES } from '../datetimes';
import { ReadQueryOptions } from '../types';

const useDatetimeQueryOptions = (): ReadQueryOptions => {
	const eventId = useEventId();

	const options: ReadQueryOptions = {
		query: GET_DATETIMES,
		variables: {
			where: {
				eventId,
			},
		},
	};

	return options;
};

export default useDatetimeQueryOptions;
