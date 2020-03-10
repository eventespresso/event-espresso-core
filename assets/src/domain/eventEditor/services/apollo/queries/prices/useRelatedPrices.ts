import { useMemo } from 'react';
import { useRelations, RelationEntity } from '@appServices/apollo/relations';
import { entitiesWithGuIdInArray } from '@sharedServices/predicates';
import usePrices from './usePrices';
import { Price } from '../../types';
import { EntityId } from '@appServices/apollo/types';

interface RelatedPricesProps {
	entity: Exclude<RelationEntity, 'prices'>;
	entityId: EntityId;
}

const useRelatedPrices = ({ entity, entityId }: RelatedPricesProps): Array<Price> => {
	const prices = usePrices();
	const { getRelations } = useRelations();
	const relatedPriceIds = getRelations({
		entity,
		entityId,
		relation: 'prices',
	});

	return useMemo(() => {
		return relatedPriceIds.length ? entitiesWithGuIdInArray(prices, relatedPriceIds) : [];
	}, [relatedPriceIds.length, prices]);
};

export default useRelatedPrices;
