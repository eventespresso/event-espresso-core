import useEventId from '../../queries/useEventId';
import { queries } from '../../queries';

const { GET_DATETIMES } = queries;

const useDateimeQueryOptions = () => {
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

export default useDateimeQueryOptions;
