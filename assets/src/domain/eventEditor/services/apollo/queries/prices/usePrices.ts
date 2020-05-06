import { useMemo } from 'react';

import usePriceQueryOptions from './usePriceQueryOptions';
import { Price, PricesList } from '../../types';
import { useCacheQuery } from '@dataServices/apollo/queries';
import { getCacheIds } from '@appServices/predicates';
/**
 * A custom react hook for retrieving all the prices from cache
 * limited to the ids passed in `include`
 */
const usePrices = (): Price[] => {
	const options = usePriceQueryOptions();
	const { data } = useCacheQuery<PricesList>(options);

	const nodes = data?.espressoPrices?.nodes || [];

	const cacheIds = getCacheIds(nodes).join(':');

	return useMemo(() => nodes, [cacheIds]);
};

export default usePrices;
