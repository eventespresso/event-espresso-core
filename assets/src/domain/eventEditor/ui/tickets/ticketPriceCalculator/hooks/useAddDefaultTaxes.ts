import { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { usePrices } from '@edtrServices/apollo/queries';
import { useDataState } from '../data';
import { getDefaultTaxes } from '@sharedEntities/prices/predicates/selectionPredicates';
import { useRelations } from '@appServices/apollo/relations';
import { getGuids } from '@application/services/predicates';
import { sortByPriceOrderIdAsc } from '@sharedEntities/prices/predicates/sortingPredicates';
import usePriceToTpcModifier from './usePriceToTpcModifier';

const useAddDefaultTaxes = (): VoidFunction => {
	const allPrices = usePrices();
	const defaultTaxPrices = getDefaultTaxes(allPrices);

	const { prices, setPrices } = useDataState();
	const { getRelations } = useRelations();

	const convertPriceToTpcModifier = usePriceToTpcModifier();

	return useCallback(() => {
		const priceIds = getGuids(prices);

		// Filter out the taxes that have already been added
		const newTpcDefaultTaxPrices = defaultTaxPrices.filter((price) => !priceIds.includes(price.id));
		const newTpcDefaultTaxPriceModifiers = newTpcDefaultTaxPrices.map(convertPriceToTpcModifier);

		const newPrices = [...prices, ...newTpcDefaultTaxPriceModifiers];

		//sort'em
		const sortedPrices = sortByPriceOrderIdAsc(newPrices);

		setPrices(sortedPrices);
	}, [convertPriceToTpcModifier, defaultTaxPrices, getRelations, prices, setPrices]);
};

export default useAddDefaultTaxes;
