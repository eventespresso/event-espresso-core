import { useMemo } from 'react';

import usePriceTypeQueryOptions from './usePriceTypeQueryOptions';
import { PriceType, PriceTypesList } from '../../types';
import { useCacheQuery } from '@dataServices/apollo/queries';
import { getCacheIds } from '@appServices/predicates';
/**
 * A custom react hook for retrieving all the priceTypes from cache
 */
const usePriceTypes = (): PriceType[] => {
	const options = usePriceTypeQueryOptions();
	const { data } = useCacheQuery<PriceTypesList>(options);

	const nodes = data?.espressoPriceTypes?.nodes || [];

	const cacheIds = getCacheIds(nodes).join(':');

	return useMemo(() => nodes, [cacheIds]);
};

export default usePriceTypes;
