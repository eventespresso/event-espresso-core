import useEventId from '../../queries/events/useEventId';
import { queries } from '../../queries';

const { GET_DATETIMES } = queries;

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
