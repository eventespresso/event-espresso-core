import { useMemoStringify } from '@application/services/hooks';
import { usePriceTypes } from '@edtrServices/apollo/queries';
import { isBasePrice } from '@sharedEntities/priceTypes/predicates/selectionPredicates';
import defaultPrice from '../defaultPriceModifier';
import { updatePriceModifier } from '../utils';
import { usePriceModifier } from '../hooks';
import { TpcPriceModifier } from '../types';

const useDefaultBasePrice = (): TpcPriceModifier => {
	const allPriceTypes = usePriceTypes();
	const [basePriceType] = allPriceTypes.filter(isBasePrice);

	const defaultPriceModifier = usePriceModifier(defaultPrice);
	const basePrice = updatePriceModifier(defaultPriceModifier, basePriceType);

	return useMemoStringify(basePrice);
};

export default useDefaultBasePrice;
