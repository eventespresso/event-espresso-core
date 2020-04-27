import { useCallback } from 'react';

import parsedAmount from '@appServices/utilities/money/parsedAmount';
import toBoolean from '@appServices/utilities/converters/toBoolean';
import { EntityId } from '@appServices/apollo/types';
import { useRelations } from '@appServices/apollo/relations';
import { cloneAndNormalizePrice } from '@sharedEntities/prices/predicates/updatePredicates';
import { copyTicketFields } from '@sharedEntities/tickets/predicates/updatePredicates';
import { isTicketInputField } from '@sharedEntities/tickets/predicates/selectionPredicates';
import { useDataState } from '../data';
import { shouldUpdateTicket } from '../utils';
import { useTicketMutator, usePriceMutator } from '@edtrServices/apollo/mutations';
import { useTicketItem } from '@edtrServices/apollo/queries';

const useOnSubmitPrices = (): VoidFunction => {
	const { deletedPrices: deletedPriceIds, prices, ticket } = useDataState();

	const { createEntity: createPrice, deleteEntity: deletePrice, updateEntity: updatePrice } = usePriceMutator();
	const { updateEntity: updateTicket } = useTicketMutator();
	const existingTicket = useTicketItem({ id: ticket.id });
	const { getRelations } = useRelations();

	// Async to make sure that prices are handled before updating the ticket.
	return useCallback(async () => {
		const relatedPriceIds: EntityId[] = [];

		// make sure to complete all price mutatons before updating the ticket
		await Promise.all(
			// convert the price mutatons into promises
			prices.map(({ isNew, isModified, ...price }) => {
				// if it's not new or modified, no need to do anything
				if (!(isNew || isModified)) {
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

		const normalizedTicketFields = {
			...copyTicketFields(ticket, isTicketInputField),
			id: ticket.id,
			price: parsedAmount(ticket.price || '0'),
			reverseCalculate: toBoolean(ticket.reverseCalculate),
		};
		// Finally update the ticket and its price relation, if needed
		const ticketNeedsUpdate = shouldUpdateTicket({
			existingTicket,
			getRelations,
			newTicket: ticket,
			relatedPriceIds,
		});
		if (ticketNeedsUpdate) {
			updateTicket({ ...normalizedTicketFields, prices: relatedPriceIds });
		}
	}, [
		createPrice,
		deletePrice,
		deletedPriceIds,
		existingTicket,
		getRelations,
		prices,
		ticket,
		updatePrice,
		updateTicket,
	]);
};

export default useOnSubmitPrices;
