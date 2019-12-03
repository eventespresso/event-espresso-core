import * as R from 'ramda';
import { useApolloClient } from '@apollo/react-hooks';
import { GET_DATETIMES } from './dates';

const useDatetimeIds = () => {
	const eventId = R.pathOr(null, ['eeEditorEventData', 'eventId'], window);
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
		throw new Error(error);
	}

	const getDatetimes = (data) => R.pathOr([], ['datetimes', 'nodes'], data);
	const getIds = (datetimes) => R.map(({ id }) => id, datetimes);
	const getDatetimeIds = R.pipe(getDatetimes, getIds);
	const datetimeIds = getDatetimeIds(data);

	return datetimeIds;
};

export default useDatetimeIds;
