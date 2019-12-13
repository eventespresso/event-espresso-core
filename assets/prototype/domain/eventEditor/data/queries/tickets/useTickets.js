import * as R from 'ramda';
import { useApolloClient } from '@apollo/react-hooks';

import useDatetimeIds from '../datetimes/useDatetimeIds';
import { GET_TICKETS } from './tickets';
import useStatus from '../../../../../application/services/apollo/status/useStatus';

const useTickets = () => {
	const { isLoaded } = useStatus();
	const client = useApolloClient();
	const datetimeIn = useDatetimeIds();
	if (!isLoaded('tickets')) {
		return [];
	}
	let data;

	try {
		data = client.readQuery({
			query: GET_TICKETS,
			variables: {
				where: {
					datetimeIn,
				},
			},
		});
	} catch (error) {
		data = {};
	}

	return R.pathOr([], ['tickets', 'nodes'], data);
};

export default useTickets;
