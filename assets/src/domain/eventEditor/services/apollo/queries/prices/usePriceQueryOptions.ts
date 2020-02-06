import useTicketIds from '../tickets/useTicketIds';
import { GET_PRICES } from '../prices';
import { ReadQueryOptions } from '../types';
import { EntityId } from '../../types';

const usePriceQueryOptions = (ticketIn: EntityId[] = []): ReadQueryOptions => {
	const ticketIds = useTicketIds();
	const options: ReadQueryOptions = {
		query: GET_PRICES,
		variables: {
			where: {
				ticketIn: ticketIn.length ? ticketIn : ticketIds,
			},
		},
	};

	return options;
};

export default usePriceQueryOptions;
