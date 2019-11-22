import get from 'lodash/get';
import { useApolloClient } from '@apollo/react-hooks';
import { GET_DATETIMES } from './queries/dates';

const { console } = window.console;

const useDatesListData = (eventId) => {
	try {
		const client = useApolloClient();
		console.log('%c useDatesListData', 'color: lime;');
		const data = client.readQuery({
			query: GET_DATETIMES,
			variables: {
				where: {
					eventId
				}
			}
		});
		console.log('%c > useDatesListData data:', 'color: lime;', data);
		return {
			datetimes: get(data, ['datetimes', 'nodes'])
		};
	} catch (errors) {
		return { errors };
	}
};

export default useDatesListData;
