import * as R from 'ramda';
import { useApolloClient } from '@apollo/react-hooks';

import { GET_PRICE_TYPES } from './priceTypes';

/**
 * A custom react hook for retrieving all the priceTypes from cache
 *
 */
const usePriceTypes = () => {
	const client = useApolloClient();
	let data;

	try {
		data = client.readQuery({
			query: GET_PRICE_TYPES,
		});
	} catch (error) {
		data = {};
	}

	const priceTypes = R.pathOr([], ['priceTypes', 'nodes'], data);

	return priceTypes;
};

export default usePriceTypes;
