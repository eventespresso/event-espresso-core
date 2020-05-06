import { identity, sortBy } from 'ramda';

import useTicketIds from '../tickets/useTicketIds';
import { GET_PRICES } from '../prices';
import { EntityId } from '@dataServices/types';
import { ReadQueryOptions } from '@dataServices/apollo/queries';

const usePriceQueryOptions = (ticketIn: EntityId[] = []): ReadQueryOptions => {
	const ticketIds = useTicketIds();

	let newTicketIn = ticketIn.length ? ticketIn : ticketIds;

	// Sort the IDs list which may be out of order,
	// thus changing the key used to access apollo cache
	newTicketIn = sortBy(identity, newTicketIn);

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
