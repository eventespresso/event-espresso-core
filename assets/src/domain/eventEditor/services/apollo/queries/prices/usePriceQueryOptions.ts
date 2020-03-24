import useTicketIds from '../tickets/useTicketIds';
import { GET_PRICES } from '../prices';
import { ReadQueryOptions } from '../types';
import { EntityId } from '@appServices/apollo/types';

const usePriceQueryOptions = (ticketIn: EntityId[] = []): ReadQueryOptions => {
	const ticketIds = useTicketIds();

	const newTicketIn = ticketIn.length ? ticketIn : ticketIds;

	// Sort the IDs list which may be out of order,
	// thus changing the key used to access apollo cache
	newTicketIn.sort();

	const options: ReadQueryOptions = {
		query: GET_PRICES,
		variables: {
			where: {
				ticketIn: newTicketIn,
			},
		},
	};

	return options;
};

export default usePriceQueryOptions;
