import { pathOr } from 'ramda';
import { useApolloClient } from '@apollo/react-hooks';

import useStatus from '../../../../../application/services/apollo/status/useStatus';
import useTicketQueryOptions from './useTicketQueryOptions';
import { ReadQueryOptions } from '../types';
import { Ticket, EntityId } from '../../types';

const useTickets = (): Ticket[] => {
	const options: ReadQueryOptions = useTicketQueryOptions();
	const { isLoaded } = useStatus();
	const client = useApolloClient();
	if (!isLoaded('tickets')) {
		return [];
	}
	let data: any;

	try {
		data = client.readQuery(options);
	} catch (error) {
		data = {};
	}

	return pathOr([], ['espressoTickets', 'nodes'], data);
};

export default useTickets;
