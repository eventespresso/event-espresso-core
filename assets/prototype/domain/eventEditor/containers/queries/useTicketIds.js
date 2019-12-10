import * as R from 'ramda';
import { useApolloClient } from '@apollo/react-hooks';

import useDatetimeIds from './useDatetimeIds';
import { GET_TICKETS } from './tickets';

const useTicketIds = () => {
	const client = useApolloClient();
	const datetimeIn = useDatetimeIds();
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

	const ticketIds = R.pathOr([], ['tickets', 'nodes'], data).map(({ id }) => id);

	return ticketIds;
};

export default useTicketIds;
