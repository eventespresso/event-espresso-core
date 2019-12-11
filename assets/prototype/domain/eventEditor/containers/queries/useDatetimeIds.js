import * as R from 'ramda';
import { useApolloClient } from '@apollo/react-hooks';
import { GET_DATETIMES } from './datetimes';
import useEventId from './useEventId';
import useStatus from '../../../../infrastructure/services/status/useStatus';

const useDatetimeIds = () => {
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

	const datetimeIds = R.pathOr([], ['datetimes', 'nodes'], data).map(({ id }) => id);

	return datetimeIds;
};

export default useDatetimeIds;
