import { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { usePrices } from '@edtrServices/apollo/queries';
import { useDataState } from '../data';
import { getDefaultTaxes } from '@sharedEntities/prices/predicates/selectionPredicates';
import { useRelations } from '@appServices/apollo/relations';
import { getGuids } from '@application/services/predicates';
import { sortByPriceOrderIdAsc } from '@sharedEntities/prices/predicates/sortingPredicates';
import usePriceToTpcModifier from './usePriceToTpcModifier';

const useRemoveTaxes = (): VoidFunction => {
	const allPrices = usePrices();
	const defaultTaxPrices = getDefaultTaxes(allPrices);

	const { prices, setPrices } = useDataState();
	const { getRelations } = useRelations();

	const convertPriceToTpcModifier = usePriceToTpcModifier();

	return useCallback(() => {
		const newTpcPrices = prices.filter(({ isTax }) => !isTax);
		const newPrices = newTpcPrices.map(convertPriceToTpcModifier);

		const sortedPrices = sortByPriceOrderIdAsc(newPrices);

		console.log({ sortedPrices });

		setPrices(sortedPrices);
	}, [convertPriceToTpcModifier, defaultTaxPrices, getRelations, prices, setPrices]);
};

export default useRemoveTaxes;
