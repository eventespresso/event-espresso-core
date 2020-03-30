import { useMemo } from 'react';
import { useRelations } from '@appServices/apollo/relations';
import { entitiesWithGuIdInArray } from '@sharedServices/predicates';
import usePrices from './usePrices';
import { Price } from '../../types';
import { RelatedEntitiesHook } from '../types';

const useRelatedPrices: RelatedEntitiesHook<Price, 'prices'> = ({ entity, entityId }) => {
	const prices = usePrices();
	const { getRelations } = useRelations();
	const relatedPriceIds = getRelations({
		entity,
		entityId,
		relation: 'prices',
	});

	return useMemo(() => entitiesWithGuIdInArray(prices, relatedPriceIds), [relatedPriceIds, prices]);
};

export default useRelatedPrices;
