import isEmpty from 'ramda/src/isEmpty';
import useRelations from '../../../../../application/services/apollo/relations/useRelations';
import usePriceTypes from './usePriceTypes';
import useDefaultPriceType from './useDefaultPriceType';
import { PriceType, EntityId } from '../../types';

/**
 * A custom react hook for retrieving the related priceType from cache for the given Price entity
 *
 * @param {string} priceId price.id
 */
const usePriceTypeForPrice = (priceId: EntityId): PriceType => {
	const { getRelations } = useRelations();
	// get related priceTypes for this price
	const relatedPriceTypeIds: EntityId[] = getRelations({
		entity: 'prices',
		entityId: priceId,
		relation: 'priceTypes',
	});

	// get the default price type object
	const defaultPriceType: PriceType = useDefaultPriceType();
	const relatedPriceTypes: PriceType[] = usePriceTypes(relatedPriceTypeIds);

	return !isEmpty(relatedPriceTypes) ? relatedPriceTypes[0] : defaultPriceType;
};

export default usePriceTypeForPrice;
