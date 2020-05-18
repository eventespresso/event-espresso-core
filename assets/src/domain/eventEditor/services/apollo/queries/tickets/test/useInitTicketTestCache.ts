import { useApolloClient } from '@apollo/react-hooks';

import useTicketQueryOptions from '../useTicketQueryOptions';
import { WriteQueryOptions } from '@dataServices/apollo/queries/types';
import { edge } from './data';

const useInitTicketTestCache = (espressoTickets = edge): void => {
	// init hooks
	const client = useApolloClient();
	const queryOptions = useTicketQueryOptions();

	const writeQueryOptions: WriteQueryOptions = {
		...queryOptions,
		data: {
			espressoTickets,
		},
	};
	try {
		// write the test data to cache
		client.writeQuery(writeQueryOptions);
	} catch (error) {
		console.error(error);
	}
};
export default useInitTicketTestCache;
