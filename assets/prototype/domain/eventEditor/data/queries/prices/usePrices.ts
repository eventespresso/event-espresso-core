import pathOr from 'ramda/src/pathOr';
import { useApolloClient } from '@apollo/react-hooks';

import { entitiesWithGuIdInArray } from '../../../../shared/predicates/shared/selectionPredicates';
import { useStatus, TypeName } from '../../../../../application/services/apollo/status';
import usePriceQueryOptions from './usePriceQueryOptions';
import { ReadQueryOptions } from '../types';
import { Price, EntityId } from '../../types';
/**
 * A custom react hook for retrieving all the prices from cache
 * limited to the ids passed in `include`
 *
 * @param {array} include Array of price ids to include.
 */
const usePrices = (include: EntityId[] = []): Price[] => {
	const options: ReadQueryOptions = usePriceQueryOptions();
	const { isLoaded } = useStatus();
	const client = useApolloClient();
	if (!isLoaded(TypeName.prices)) {
		return [];
	}
	let data: any;

	try {
		data = client.readQuery(options);
	} catch (error) {
		data = {};
	}

	const prices = pathOr<Price[]>([], ['espressoPrices', 'nodes'], data);
	return include.length ? entitiesWithGuIdInArray(prices, include) : prices;
};

export default usePrices;
