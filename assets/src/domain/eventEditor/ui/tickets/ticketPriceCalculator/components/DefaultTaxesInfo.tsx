import React, { useEffect } from 'react';
import { __, sprintf } from '@wordpress/i18n';

import { getDefaultTaxes } from '@sharedEntities/prices/predicates/selectionPredicates';
import { useDataState } from '../data';
import { useEdtrState } from '@edtrHooks/edtrState';
import { usePrices } from '@edtrServices/apollo';

const DefaultTaxesInfo: React.FC = () => {
	const allPrices = usePrices();
	const defaultTaxPrices = getDefaultTaxes(allPrices);

	const { prices } = useDataState();
	const tpcDefaultTaxPrices = getDefaultTaxes(prices);
	const { pricesPollInterval, setPricesPollInterval } = useEdtrState();

	useEffect(() => {
		return () => {
			// disable polling on unmount.
			pricesPollInterval && setPricesPollInterval(0);
		};
	}, [pricesPollInterval, setPricesPollInterval]);

	const newTaxesFetched = pricesPollInterval && defaultTaxPrices.length !== tpcDefaultTaxPrices.length;

	return newTaxesFetched ? (
		<div className='ee-tpc__default-taxes-info'>
			{sprintf(
				__('New default taxes are available. Click the "%s" button to add them now.'),
				__('Add default taxes')
			)}
		</div>
	) : null;
};

export default DefaultTaxesInfo;
