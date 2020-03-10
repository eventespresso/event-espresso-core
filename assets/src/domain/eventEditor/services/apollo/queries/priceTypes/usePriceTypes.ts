import usePriceTypeQueryOptions from './usePriceTypeQueryOptions';
import { entitiesWithGuIdInArray } from '@sharedServices/predicates';
import { EntityId } from '@appServices/apollo/types';
import { PriceType, PriceTypesList } from '../../types';
import useCacheQuery from '../useCacheQuery';
/**
 * A custom react hook for retrieving all the priceTypes from cache
 * limited to the ids passed in `include`
 *
 * @param {array} include Array of price ids to include.
 */
const usePriceTypes = (include: EntityId[] = []): PriceType[] => {
	const options = usePriceTypeQueryOptions();
	const { data } = useCacheQuery<PriceTypesList>(options);

	const priceTypes = data?.espressoPriceTypes?.nodes || [];

	return include.length ? entitiesWithGuIdInArray(priceTypes, include) : priceTypes;
};

export default usePriceTypes;
