import { useCallback } from 'react';

import defaultPrice from '../defaultPriceModifier';
import { isBasePrice } from '@sharedEntities/priceTypes/predicates/selectionPredicates';
import { sortByPriceOrderIdAsc } from '@sharedEntities/prices/predicates/sortingPredicates';
import { updatePriceModifier } from '../utils';
import { usePriceModifier } from '../hooks';
import { usePriceTypes, usePrices } from '@edtrServices/apollo/queries';
import { isDefault } from '@sharedEntities/prices/predicates/selectionPredicates';
import { useDataState } from '../data';
import usePriceToTpcModifier from './usePriceToTpcModifier';

const useAddDefaultPrices = (): VoidFunction => {
	const allPriceTypes = usePriceTypes();
	const allPrices = usePrices();
	const defaultPrices = allPrices.filter(isDefault);
	const [basePriceType] = allPriceTypes.filter(isBasePrice);

	const defaultPriceModifier = usePriceModifier(defaultPrice);
	const basePrice = updatePriceModifier(defaultPriceModifier, basePriceType);

	const convertPriceToTpcModifier = usePriceToTpcModifier();

	const { setPrices } = useDataState();

	return useCallback(() => {
		const prices = defaultPrices.map((price) => {
			const priceModifier = convertPriceToTpcModifier(price);
			// if it's a tax
			if (price.isTax) {
				// return without cloning
				return priceModifier;
			}
			return {
				...priceModifier,
				// clone it
				id: '',
				dbId: 0,
				isNew: true,
				// avoid default price getting duplicated
				isDefault: false,
			};
		});

		//sort'em
		let sortedPrices = sortByPriceOrderIdAsc(prices);

		const hasBasePrice = sortedPrices.filter(isBasePrice).length;
		// if there is no basePrice
		if (!hasBasePrice) {
			// add the base price with `isNew` flag to make sure it's created on submit
			// `order` as 1 to make sure it remains at the top
			sortedPrices = [{ ...basePrice, order: 1, isNew: true }, ...sortedPrices];
		}
		setPrices(sortedPrices);
	}, [basePrice, convertPriceToTpcModifier, defaultPrices, setPrices]);
};

export default useAddDefaultPrices;
