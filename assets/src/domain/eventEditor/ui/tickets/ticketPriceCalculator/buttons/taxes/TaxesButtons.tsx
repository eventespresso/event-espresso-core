import React from 'react';
import { __ } from '@wordpress/i18n';

import { usePrices } from '@edtrServices/apollo/queries';
import { useDataState } from '../../data';
import { getDefaultTaxes } from '@sharedEntities/prices/predicates/selectionPredicates';

import AddDefaultTaxesButton from './AddDefaultTaxesButton';
import RemoveTaxesButton from './RemoveTaxesButton';

const TaxesButtons: React.FC = () => {
	const allPrices = usePrices();
	const defaultTaxPrices = getDefaultTaxes(allPrices);

	const { prices } = useDataState();
	const tpcDefaultTaxPrices = getDefaultTaxes(prices);

	// since we load all the default prices in EDTR
	// so if the the number of TPC taxes is equal to number of all default taxes
	// It means that TPC has all the possible tax prices
	if (defaultTaxPrices.length === tpcDefaultTaxPrices.length) {
		return <RemoveTaxesButton />;
	}

	return <AddDefaultTaxesButton />;
};

export default TaxesButtons;
