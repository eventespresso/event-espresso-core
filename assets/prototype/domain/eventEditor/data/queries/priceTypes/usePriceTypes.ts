import pathOr from 'ramda/src/pathOr';
import { useApolloClient } from '@apollo/react-hooks';

import usePriceTypeQueryOptions from './usePriceTypeQueryOptions';
import { entitiesWithGuIdInArray } from '../../../../shared/predicates/shared/selectionPredicates';
import { useStatus, TypeName } from '../../../../../application/services/apollo/status';
import { ReadQueryOptions } from '../types';
import { PriceType, PriceTypesList, EntityId } from '../../types';
/**
 * A custom react hook for retrieving all the priceTypes from cache
 * limited to the ids passed in `include`
 *
 * @param {array} include Array of price ids to include.
 */
const usePriceTypes = (include: EntityId[] = []): PriceType[] => {
	const options: ReadQueryOptions = usePriceTypeQueryOptions();
	const { isLoaded } = useStatus();
	const client = useApolloClient();
	if (!isLoaded(TypeName.priceTypes)) {
		return [];
	}
	let data: PriceTypesList;

	try {
		data = client.readQuery<PriceTypesList>(options);
	} catch (error) {
		data = null;
	}
	const priceTypes = pathOr<PriceType[]>([], ['espressoPriceTypes', 'nodes'], data);
	return include.length ? entitiesWithGuIdInArray(priceTypes, include) : priceTypes;
};

export default usePriceTypes;
