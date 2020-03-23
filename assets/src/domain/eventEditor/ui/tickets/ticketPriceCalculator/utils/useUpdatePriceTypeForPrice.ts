import { useCallback } from 'react';
import { find, propEq } from 'ramda';

import { usePriceTypes } from '@edtrServices/apollo';
import { getPriceType, updatePriceModifier } from './utilities';
import { getDefaultPriceModifierType } from '@sharedEntities/priceTypes/predicates/index';
import { DataState } from '../data';

const useUpdatePriceTypeForPrice = () => {
	const priceTypes = usePriceTypes();
	const getPriceTypeForPrice = getPriceType(priceTypes);
	const defaultPriceType = getDefaultPriceModifierType(priceTypes);

	return useCallback((priceId: string, state: DataState) => {
		const priceModifier = find<typeof state.prices[0]>(propEq('id', priceId), state.prices);

		if (!priceModifier) {
			return null;
		}

		// we need to know some details about the price type so get that object using the GUID set in the form
		const priceType = getPriceTypeForPrice(priceModifier) || defaultPriceType;
		// update price modifier data with props from newly selected price type
		const updatedPriceModifier = updatePriceModifier(priceModifier, priceType);

		return updatedPriceModifier;
	}, []);
};

export default useUpdatePriceTypeForPrice;
