import { useMemo } from 'react';
import { useRelations } from '@appServices/apollo/relations';
import { entitiesWithGuIdInArray } from '@sharedServices/predicates';
import usePrices from './usePrices';
import { Price } from '../../types';
import { RelatedEntitiesHook } from '../types';
import { entityListCacheIdString } from '@appServices/utilities/memo';

const useRelatedPrices: RelatedEntitiesHook<Price, 'prices'> = ({ entity, entityId }) => {
	const prices = usePrices();
	const { getRelations } = useRelations();
	const relatedPriceIds = getRelations({
		entity,
		entityId,
		relation: 'prices',
	});

	const cacheIds = entityListCacheIdString(prices);
	const relatedPriceIdsStr = JSON.stringify(relatedPriceIds);

	return useMemo(() => entitiesWithGuIdInArray(prices, relatedPriceIds), [relatedPriceIdsStr, cacheIds]);
};

export default useRelatedPrices;
