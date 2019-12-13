import pathOr from 'ramda/src/pathOr';
import { useApolloClient } from '@apollo/react-hooks';

import { GET_PRICE_TYPES } from './priceTypes';
import { entitiesWithGuIdInArray } from '../../../../shared/predicates/shared/selectionPredicates';
import useStatus from '../../../../../application/services/apollo/status/useStatus';

/**
 * A custom react hook for retrieving all the priceTypes from cache
 * limited to the ids passed in `include`
 *
 * @param {array} include Array of price ids to include.
 */
const usePriceTypes = (include = []) => {
	const { isLoaded } = useStatus();
	const client = useApolloClient();
	if (!isLoaded('priceTypes')) {
		return [];
	}
	let data;

	try {
		data = client.readQuery({
			query: GET_PRICE_TYPES,
		});
	} catch (error) {
		data = {};
	}
	const priceTypes = pathOr([], ['priceTypes', 'nodes'], data);
	return include.length ? entitiesWithGuIdInArray(priceTypes, include) : priceTypes;
};

export default usePriceTypes;
