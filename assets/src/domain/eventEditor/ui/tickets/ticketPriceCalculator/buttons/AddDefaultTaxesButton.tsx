import React from 'react';
import { __ } from '@wordpress/i18n';

import { usePrices } from '@edtrServices/apollo/queries';
import { useDataState } from '../data';
import { getDefaultTaxes } from '@sharedEntities/prices/predicates/selectionPredicates';
import { Button } from '@application/ui/input';
import { useAddDefaultTaxes } from '../hooks';

const AddDefaultTaxesButton: React.FC = () => {
	const allPrices = usePrices();
	const defaultTaxPrices = getDefaultTaxes(allPrices);

	const { prices } = useDataState();
	const tpcDefaultTaxPrices = getDefaultTaxes(prices);

	const addDefaultTaxes = useAddDefaultTaxes();
	// since we load all the default prices in EDTR
	// so if the the number of TPC taxes is equal to number of all default taxes
	// It means that TPC has all the possible tax prices
	if (defaultTaxPrices.length === tpcDefaultTaxPrices.length) {
		// do not show the button
		return null;
	}

	return <Button onClick={addDefaultTaxes} buttonText={__('Add default taxes')} />;
};
export default AddDefaultTaxesButton;
