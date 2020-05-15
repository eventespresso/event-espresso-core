import { useCallback } from 'react';

import { EntityId } from '@dataServices/types';
import { cloneAndNormalizePrice } from '@sharedEntities/prices/predicates/updatePredicates';
import { usePriceMutator } from '@edtrServices/apollo/mutations';
import { TpcPriceModifier } from '../types';

type Callback = (prices: Array<TpcPriceModifier>, deletedPrices: Array<EntityId>) => Promise<Array<EntityId>>;

const useMutatePrices = (): Callback => {
	const { createEntity: createPrice, deleteEntity: deletePrice, updateEntity: updatePrice } = usePriceMutator();

	// Async to make sure that prices are handled before updating the ticket.
	return useCallback(
		async (prices, deletedPriceIds = []) => {
			const relatedPriceIds: EntityId[] = [];

			// make sure to complete all price mutatons before updating the ticket
			await Promise.all(
				// convert the price mutatons into promises
				prices.map(({ isNew, isModified, ...price }) => {
					// if it's not new or modified, no need to do anything
					// but base price needs to be updated anyway which may been modified by revCalc
					if (!(isNew || isModified) && !price.isBasePrice) {
						// retain the existing relation
						relatedPriceIds.push(price.id);
						return Promise.resolve(price);
					}
					const normalizedPriceFields = cloneAndNormalizePrice(price);
					// if it's a newly added price
					if (isNew) {
						return new Promise((resolve, onError) => {
							const onCompleted = ({ createEspressoPrice: { espressoPrice: price } }): void => {
								relatedPriceIds.push(price.id);
								resolve(price);
							};
							createPrice({ ...normalizedPriceFields }, { onCompleted, onError });
						});
					}
					// it's surely an existing price that's been modified
					return new Promise((resolve, onError) => {
						const onCompleted = ({ updateEspressoPrice: { espressoPrice: price } }): void => {
							relatedPriceIds.push(price.id);
							resolve(price);
						};
						updatePrice({ id: price.id, ...normalizedPriceFields }, { onCompleted, onError });
					});
				})
			);

			// Delete all unlucky ones
			await Promise.all(
				deletedPriceIds.map((id) => {
					return new Promise((onCompleted, onError) =>
						deletePrice({ id, deletePermanently: true }, { onCompleted, onError })
					);
				})
			);

			return relatedPriceIds;
		},
		[createPrice, deletePrice, updatePrice]
	);
};

export default useMutatePrices;
