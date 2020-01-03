import usePriceTypes from './usePriceTypes';
import { PriceType } from '../../types';
import { getDefaultPriceType } from '../../../../shared/predicates/priceTypes/selectionPredicates';

/**
 * A custom react hook for retrieving the default price type object.
 */
const useDefaultPriceType = (): PriceType => {
	const allPriceTypes: PriceType[] = usePriceTypes();
	return getDefaultPriceType(allPriceTypes);
};

export default useDefaultPriceType;
