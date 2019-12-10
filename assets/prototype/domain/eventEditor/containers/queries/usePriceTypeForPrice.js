import isEmpty from 'ramda/src/isEmpty';
import type from 'ramda/src/type';
import useRelations from '../../../../infrastructure/services/relations/useRelations';
import usePriceTypes from './usePriceTypes';

const DEFAULT_PRICE_TYPE = { dbId: 4 };

/**
 * A custom react hook for retrieving the related priceType from cache for the given Price entity
 *
 * @param {string} priceId price.id
 */
const usePriceTypeForPrice = (priceId) => {
	const { getRelations } = useRelations();
	// get related priceTypes for this price
	const relatedPriceTypeIds = getRelations({
		entity: 'prices',
		entityId: priceId,
		relation: 'priceTypes',
	});
	if ( isEmpty(relatedPriceTypeIds)) {
		return DEFAULT_PRICE_TYPE;
	}
	const relatedPriceTypes = usePriceTypes(relatedPriceTypeIds);
	return type(relatedPriceTypes) === 'Array' && ! isEmpty(relatedPriceTypes) ?
		relatedPriceTypes[0] :
		DEFAULT_PRICE_TYPE;
};

export default usePriceTypeForPrice;
