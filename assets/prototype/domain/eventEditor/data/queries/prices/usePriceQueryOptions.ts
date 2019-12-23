import useTicketIds from '../tickets/useTicketIds';
import { GET_PRICES } from './';
import { ReadQueryOptions } from '../types';
import { EntityId } from '../../types';

const usePriceQueryOptions = (): ReadQueryOptions => {
	const ticketIn: EntityId[] = useTicketIds();
	const options: ReadQueryOptions = {
		query: GET_PRICES,
		variables: {
			where: {
				ticketIn,
			},
		},
	};

	return options;
};

export default usePriceQueryOptions;
