import isEmpty from 'ramda/src/isEmpty';
import type from 'ramda/src/type';
import useRelations from '../../../../infrastructure/services/relations/useRelations';
import usePriceTypes from './usePriceTypes';
import useDefaultPriceType from './useDefaultPriceType';

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

	// get the default price type object
	const defaultPriceType = useDefaultPriceType();
	const relatedPriceTypes = usePriceTypes(relatedPriceTypeIds);

	return type(relatedPriceTypes) === 'Array' && !isEmpty(relatedPriceTypes) ? relatedPriceTypes[0] : defaultPriceType;
};

export default usePriceTypeForPrice;
