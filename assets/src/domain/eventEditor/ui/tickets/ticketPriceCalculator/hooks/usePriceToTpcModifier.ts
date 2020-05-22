import React, { useCallback } from 'react';
import { assocPath } from 'ramda';

import { useRelations } from '@appServices/apollo/relations';
import { Price, usePriceTypes } from '@edtrServices/apollo';
import { TpcPriceModifier } from '../types';

type Callback = (price: Price) => TpcPriceModifier;

const usePriceToTpcModifier = (): Callback => {
	const { getRelations } = useRelations();
	const allPriceTypes = usePriceTypes();
	const priceTypeIdOrder = allPriceTypes.reduce((acc, { id, order }) => assocPath([id], order, acc), {});

	return useCallback<Callback>(
		(price) => {
			const priceTypes = getRelations({
				entity: 'prices',
				entityId: price.id,
				relation: 'priceTypes',
			});
			const [priceTypeId] = priceTypes;
			// convert to TPC price objects by adding
			// "priceType" and "priceTypeOrder"
			return {
				...price,
				priceType: priceTypeId,
				priceTypeOrder: priceTypeIdOrder[priceTypeId],
			};
		},
		[getRelations, priceTypeIdOrder]
	);
};

export default usePriceToTpcModifier;
