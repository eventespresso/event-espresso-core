import useEventId from '../events/useEventId';
import { GET_DATETIMES } from '../datetimes';
import { DatetimesList, DatetimesQueryArgs, ReadQueryOptions } from '@dataServices/apollo/queries';
import { DatetimeEdge } from '@edtrServices/apollo/types';

type DatetimesQueryOptions = ReadQueryOptions<DatetimesList<DatetimeEdge>, DatetimesQueryArgs>;

const useDatetimeQueryOptions = (): DatetimesQueryOptions => {
	const eventId = useEventId();

	const options: DatetimesQueryOptions = {
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
