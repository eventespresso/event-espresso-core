import usePriceTypes from './usePriceTypes';
import { PriceType } from '../../types';
import { getDefaultPriceModifierType } from '../../../../../shared/entities/priceTypes/predicates/selectionPredicates';

/**
 * A custom react hook for retrieving the default price type object.
 */
const useDefaultPriceType = (): PriceType => {
	const allPriceTypes = usePriceTypes();
	const defaultPriceType = getDefaultPriceModifierType(allPriceTypes);
	return defaultPriceType ? defaultPriceType : null;
};

export default useDefaultPriceType;
