import useTicketIds from '../tickets/useTicketIds';
import { GET_PRICES } from './';

const usePriceQueryOptions = () => {
	const ticketIn = useTicketIds();
	const options = {
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
