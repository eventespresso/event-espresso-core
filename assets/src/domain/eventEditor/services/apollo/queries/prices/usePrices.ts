import { pathOr } from 'ramda';

import { entitiesWithGuIdInArray } from '../../../../../shared/services/predicates';
import { useStatus, TypeName } from '../../../../../../application/services/apollo/status';
import usePriceQueryOptions from './usePriceQueryOptions';
import { Price, PricesList, EntityId } from '../../types';
import useCacheQuery from '../useCacheQuery';
/**
 * A custom react hook for retrieving all the prices from cache
 * limited to the ids passed in `include`
 *
 * @param {array} include Array of price ids to include.
 */
const usePrices = (include: EntityId[] = []): Price[] => {
	const options = usePriceQueryOptions();
	const { isLoaded } = useStatus();
	const { data } = useCacheQuery<PricesList>(options);

	if (!isLoaded(TypeName.prices)) {
		return [];
	}

	const prices = pathOr<Price[]>([], ['espressoPrices', 'nodes'], data);

	return include.length ? entitiesWithGuIdInArray(prices, include) : prices;
};

export default usePrices;
