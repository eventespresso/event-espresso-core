import * as R from 'ramda';
import { useApolloClient } from '@apollo/react-hooks';

import useStatus from '../../../../../application/services/apollo/status/useStatus';
import useTicketQueryOptions from './useTicketQueryOptions';

const useTickets = () => {
	const options = useTicketQueryOptions();
	const { isLoaded } = useStatus();
	const client = useApolloClient();
	/* if (!isLoaded('tickets')) {
		return [];
	} */
	let data;

	try {
		data = client.readQuery(options);
	} catch (error) {
		data = {};
	}

	return R.pathOr([], ['tickets', 'nodes'], data);
};

export default useTickets;
