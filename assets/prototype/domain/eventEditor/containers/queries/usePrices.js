import * as R from 'ramda';
import { useApolloClient } from '@apollo/react-hooks';

import { GET_PRICES } from './prices';
import useTicketIds from './useTicketIds';

/**
 * A custom react hook for retrieving all the prices from cache
 * limited to the ids passed in `include`
 *
 * @param {array} include Array of price ids to include.
 */
const usePrices = (include = []) => {
	const client = useApolloClient();
	const ticketIn = useTicketIds();
	let data;

	try {
		data = client.readQuery({
			query: GET_PRICES,
			variables: {
				where: {
					ticketIn,
				},
			},
		});
	} catch (error) {
		data = {};
	}

	let prices = R.pathOr([], ['prices', 'nodes'], data);

	if (include.length) {
		prices = prices.filter(({ id }) => include.includes(id));
	}

	return prices;
};

export default usePrices;
