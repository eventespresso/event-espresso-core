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

	const getDatetimes = R.pathOr([], ['datetimes', 'nodes']);
	const getIds = R.map(({ id }) => id);
	const datetimeIds = R.pipe(getDatetimes, getIds)(data);

	return datetimeIds;
};

export default useDatetimeIds;
