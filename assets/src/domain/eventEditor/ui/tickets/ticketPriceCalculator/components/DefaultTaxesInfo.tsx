import React, { useEffect } from 'react';
import { any } from 'ramda';
import { __, sprintf } from '@wordpress/i18n';

import { isDefault, getDefaultTaxes } from '@sharedEntities/prices/predicates/selectionPredicates';
import { useDataState } from '../data';
import { useEdtrState } from '@edtrHooks/edtrState';
import { usePrices } from '@edtrServices/apollo';

const DefaultTaxesInfo = () => {
	const allPrices = usePrices();
	const defaultTaxPrices = getDefaultTaxes(allPrices);

	const { prices } = useDataState();
	const tpcDefaultTaxPrices = getDefaultTaxes(prices);
	const { pricesPollInterval, setPricesPollInterval } = useEdtrState();

	const hasDefaultPrice = any(isDefault, prices);

	useEffect(() => {
		if (!hasDefaultPrice && pricesPollInterval) {
			// disable long polling
			setPricesPollInterval(0);
		}
		return () => {
			// disable polling on unmount.
			pricesPollInterval && setPricesPollInterval(0);
		};
	}, [hasDefaultPrice, pricesPollInterval, setPricesPollInterval]);

	const newTaxesFetched = pricesPollInterval && defaultTaxPrices.length !== tpcDefaultTaxPrices.length;

	return newTaxesFetched ? (
		<div className='ee-tpc__default-taxes-info'>
			{sprintf(__('New taxes have been fetched please click %s button to add them.'), __('Add default taxes'))}
		</div>
	) : null;
};

export default DefaultTaxesInfo;
