import { pathOr } from 'ramda';

import usePriceTypeQueryOptions from './usePriceTypeQueryOptions';
import { entitiesWithGuIdInArray } from '../../../../../shared/services/predicates/shared/selectionPredicates';
import { useStatus, TypeName } from '../../../../../../application/services/apollo/status';
import { PriceType, PriceTypesList, EntityId } from '../../types';
import useCacheQuery from '../useCacheQuery';
/**
 * A custom react hook for retrieving all the priceTypes from cache
 * limited to the ids passed in `include`
 *
 * @param {array} include Array of price ids to include.
 */
const usePriceTypes = (include: EntityId[] = []): PriceType[] => {
	const options = usePriceTypeQueryOptions();
	const { isLoaded } = useStatus();
	const { data } = useCacheQuery<PriceTypesList>(options);

	if (!isLoaded(TypeName.priceTypes)) {
		return [];
	}
	const priceTypes = pathOr<PriceType[]>([], ['espressoPriceTypes', 'nodes'], data);

	return include.length ? entitiesWithGuIdInArray(priceTypes, include) : priceTypes;
};

export default usePriceTypes;
