import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';
import { allPass, assocPath } from 'ramda';

import { usePrices, usePriceTypes } from '@edtrServices/apollo/queries';
import { TpcPriceModifier } from '../types';
import { useDataState } from '../data';
import { isDefault, isTax } from '@sharedEntities/prices/predicates/selectionPredicates';
import { useRelations } from '@appServices/apollo/relations';
import { getGuids } from '@application/services/predicates';
import { sortByPriceOrderIdAsc } from '@sharedEntities/prices/predicates/sortingPredicates';
import { Button } from '@application/ui/input';

const AddDefaultTaxesButton: React.FC = () => {
	const allPriceTypes = usePriceTypes();
	const allPrices = usePrices();
	const defaultTaxPrices = allPrices.filter(allPass([isDefault, isTax]));

	const { prices, setPrices } = useDataState();
	const tpcDefaultTaxPrices = prices.filter(allPass([isDefault, isTax]));
	const { getRelations } = useRelations();

	const onAddDefaultTaxes = useCallback(() => {
		// convert priceType array to {[id]: order}
		const priceTypeIdOrder = allPriceTypes.reduce((acc, { id, order }) => assocPath([id], order, acc), {});
		const priceIds = getGuids(prices);

		// Filter out the taxes that have already been added
		const newTpcDefaultTaxPrices = defaultTaxPrices.filter((price) => !priceIds.includes(price.id));
		const newTpcDefaultTaxPriceModifiers = newTpcDefaultTaxPrices.map((price) => {
			const priceTypes = getRelations({
				entity: 'prices',
				entityId: price.id,
				relation: 'priceTypes',
			});
			const [priceTypeId] = priceTypes;
			// convert price to TPC price modifier
			const priceModifier: TpcPriceModifier = {
				...price,
				priceType: priceTypeId,
				priceTypeOrder: priceTypeIdOrder[priceTypeId],
			};
			return priceModifier;
		});

		const newPrices = [...prices, ...newTpcDefaultTaxPriceModifiers];
		//sort'em
		let sortedPrices = sortByPriceOrderIdAsc(newPrices);
		setPrices(sortedPrices);
	}, [defaultTaxPrices, getRelations, allPriceTypes]);

	// since we load all the default prices in EDTR
	// so if the the number of TPC taxes is equal to number of all default taxes
	// It means that TPC has all the possible tax prices
	if (defaultTaxPrices.length === tpcDefaultTaxPrices.length) {
		// do not show the button
		return null;
	}

	return <Button onClick={onAddDefaultTaxes} buttonText={__('Add default taxes')} />;
};
export default AddDefaultTaxesButton;
