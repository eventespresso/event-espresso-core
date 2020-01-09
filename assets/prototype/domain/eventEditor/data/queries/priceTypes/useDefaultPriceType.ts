import usePriceTypes from './usePriceTypes';
import { PriceType } from '../../types';
import { getDefaultPriceType } from '../../../../shared/predicates/priceTypes/selectionPredicates';

/**
 * A custom react hook for retrieving the default price type object.
 */
const useDefaultPriceType = (): PriceType | null => {
	const allPriceTypes: PriceType[] = usePriceTypes();
	const defaultPriceType = getDefaultPriceType(allPriceTypes);
	return defaultPriceType ? defaultPriceType : null;
};

export default useDefaultPriceType;
