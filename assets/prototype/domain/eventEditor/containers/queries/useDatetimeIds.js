import * as R from 'ramda';
import { useApolloClient } from '@apollo/react-hooks';
import { GET_DATETIMES } from './dates';
import useEventId from './useEventId';

const useDatetimeIds = () => {
	const eventId = useEventId();
	const client = useApolloClient();
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
