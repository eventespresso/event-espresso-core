import pathOr from 'ramda/src/pathOr';
import { useApolloClient } from '@apollo/react-hooks';

import { entitiesWithGuIdInArray } from '../../../../shared/predicates/shared/selectionPredicates';
import useStatus from '../../../../../application/services/apollo/status/useStatus';
import usePriceQueryOptions from './usePriceQueryOptions';
/**
 * A custom react hook for retrieving all the prices from cache
 * limited to the ids passed in `include`
 *
 * @param {array} include Array of price ids to include.
 */
const usePrices = (include = []) => {
	const options = usePriceQueryOptions();
	const { isLoaded } = useStatus();
	const client = useApolloClient();
	if (!isLoaded('prices')) {
		return [];
	}
	let data;

	try {
		data = client.readQuery(options);
	} catch (error) {
		data = {};
	}

	const prices = pathOr([], ['prices', 'nodes'], data);
	return include.length ? entitiesWithGuIdInArray(prices, include) : prices;
};

export default usePrices;
