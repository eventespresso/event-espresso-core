import { pathOr } from 'ramda';
import { useApolloClient } from '@apollo/react-hooks';

import { useStatus, TypeName } from '../../../../../application/services/apollo/status';
import useTicketQueryOptions from './useTicketQueryOptions';
import { ReadQueryOptions } from '../types';
import { Ticket, TicketsList } from '../../types';

const useTickets = (): Ticket[] => {
	const options: ReadQueryOptions = useTicketQueryOptions();
	const { isLoaded } = useStatus();
	const client = useApolloClient();
	if (!isLoaded(TypeName.tickets)) {
		return [];
	}
	let data: TicketsList;

	try {
		data = client.readQuery<TicketsList>(options);
	} catch (error) {
		data = null;
	}

	return pathOr<Ticket[]>([], ['espressoTickets', 'nodes'], data);
};

export default useTickets;
