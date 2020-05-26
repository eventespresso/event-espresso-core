import { PriceType, PriceTypesList } from '../../types';
import { useCacheQuery } from '@dataServices/apollo/queries';
import { getCacheIds } from '@appServices/predicates';
import { useMemoStringify } from '@appServices/hooks';
import usePriceTypeQueryOptions from './usePriceTypeQueryOptions';

/**
 * A custom react hook for retrieving all the priceTypes from cache
 */
const usePriceTypes = (): PriceType[] => {
	const options = usePriceTypeQueryOptions();
	const { data } = useCacheQuery<PriceTypesList>(options);

	const nodes = data?.espressoPriceTypes?.nodes || [];

	const cacheIds = getCacheIds(nodes);

	return useMemoStringify(nodes, cacheIds);
};

export default usePriceTypes;
