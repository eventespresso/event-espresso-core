import { useCallback } from 'react';

import { useDataState } from '../data';
import { isTax } from '@sharedEntities/priceTypes/predicates';

const useRemoveAllTaxes = (): VoidFunction => {
	const { deletePrice, prices, ticket } = useDataState();

	return useCallback(() => {
		const taxPrices = prices.filter(isTax);
		taxPrices.forEach((taxPrice) => {
			// delete the price from TPC state
			deletePrice(taxPrice.id, taxPrice.isNew || taxPrice.isDefault);
		});
	}, [deletePrice, prices]);
};

export default useRemoveAllTaxes;
