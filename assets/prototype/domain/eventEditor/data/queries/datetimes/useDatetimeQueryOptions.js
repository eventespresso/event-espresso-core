import useEventId from '../events/useEventId';
import { GET_DATETIMES } from './';

const useDatetimeQueryOptions = () => {
	const eventId = useEventId();

	const options = {
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
