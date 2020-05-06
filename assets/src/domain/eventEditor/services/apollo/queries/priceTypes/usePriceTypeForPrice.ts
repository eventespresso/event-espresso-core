import isEmpty from 'ramda/src/isEmpty';
import useRelations from '@appServices/apollo/relations/useRelations';
import usePriceTypes from './usePriceTypes';
import useDefaultPriceType from './useDefaultPriceType';
import { EntityId } from '@dataServices/types';
import { PriceType } from '../../types';
import { entitiesWithGuIdInArray } from '@sharedServices/predicates';

/**
 * A custom react hook for retrieving the related priceType from cache for the given Price entity
 *
 * @param {string} priceId price.id
 */
const usePriceTypeForPrice = (priceId: EntityId): PriceType => {
	const { getRelations } = useRelations();
	// get related priceTypes for this price
	const relatedPriceTypeIds = getRelations({
		entity: 'prices',
		entityId: priceId,
		relation: 'priceTypes',
	});

	// get the default price type object
	const defaultPriceType = useDefaultPriceType();
	const allPriceTypes = usePriceTypes();

	const relatedPriceTypes = entitiesWithGuIdInArray(allPriceTypes, relatedPriceTypeIds);

	return !isEmpty(relatedPriceTypes) ? relatedPriceTypes[0] : defaultPriceType;
};

export default usePriceTypeForPrice;
