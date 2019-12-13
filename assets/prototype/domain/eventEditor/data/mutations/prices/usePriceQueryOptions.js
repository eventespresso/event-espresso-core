import useTicketIds from '../../queries/tickets/useTicketIds';
import { queries } from '../../queries';

const { GET_PRICES } = queries;

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
