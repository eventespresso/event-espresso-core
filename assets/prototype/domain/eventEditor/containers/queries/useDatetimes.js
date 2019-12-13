import * as R from 'ramda';
import { useApolloClient } from '@apollo/react-hooks';
import { GET_DATETIMES } from './datetimes';
import useEventId from './useEventId';
import useStatus from '../../../../infrastructure/services/status/useStatus';

const useDatetimes = () => {
	const { isLoaded } = useStatus();
	const eventId = useEventId();
	const client = useApolloClient();
	if (!isLoaded('datetimes')) {
		return [];
	}
	let data;

	try {
		data = client.readQuery({
			query: GET_DATETIMES,
			variables: {
				where: {
					eventId,
				},
			},
		});
	} catch (error) {
		data = {};
	}

	return R.pathOr([], ['datetimes', 'nodes'], data);
};

export default useDatetimes;
