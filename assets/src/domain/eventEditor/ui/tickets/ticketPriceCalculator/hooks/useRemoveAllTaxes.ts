import { useCallback } from 'react';

import { useDataState } from '../data';
import useRemoveDefaultTax from './useRemoveDefaultTax';
import { isTax } from '@sharedEntities/priceTypes/predicates';

const useRemoveAllTaxes = (): VoidFunction => {
	const { deletePrice, prices, ticket } = useDataState();
	const removeDefaultTax = useRemoveDefaultTax(ticket?.id);

	return useCallback(() => {
		const taxPrices = prices.filter(isTax);
		taxPrices.forEach((taxPrice) => {
			// delete the price from TPC state
			deletePrice(taxPrice.id, taxPrice.isNew || taxPrice.isDefault);
			// Remove default tax from relations
			removeDefaultTax(taxPrice);
		});
	}, [deletePrice, prices, removeDefaultTax]);
};

export default useRemoveAllTaxes;
