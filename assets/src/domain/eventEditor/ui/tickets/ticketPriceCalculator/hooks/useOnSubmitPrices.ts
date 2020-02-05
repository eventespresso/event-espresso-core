import { difference } from 'ramda';
import { useCallback } from 'react';

import { FnCallback, TpcFormData } from '../types';
import { Price } from '../../../../services/apollo/types';
import { cloneAndNormalizePrice } from '../../../../../../domain/shared/entities/prices/predicates/updatePredicates';
import { useEntityMutator, EntityType } from '../../../../../../application/services/apollo/mutations';
import toBoolean from '../../../../../../application/services/utilities/converters/toBoolean';
import parsedAmount from '../../../../../../application/services/utilities/money/parsedAmount';
import { ModalSubmit } from '../../../../../../application/ui/layout/editorModal';

const useOnSubmitPrices = (existingPrices: Price[]): FnCallback => {
	const { createEntity, updateEntity, deleteEntity } = useEntityMutator(EntityType.Price, null);
	const { updateEntity: updateTicket } = useEntityMutator(EntityType.Ticket, null);
	const existingPriceIds = existingPrices.map(({ id }) => id);

	// Async to make sure that prices are handled before updating the ticket.
	return useCallback<ModalSubmit>(
		async ({ ticket, prices = [] }: TpcFormData): Promise<void> => {
			const updatedPriceIds = [];
			const createdPriceIds = [];

			// make sure to complete all price operations before updating the ticket
			await Promise.all(
				// covert the price operations into promises
				prices.map((price: Price) => {
					if (price.id === 'NEW_PRICE') {
						return Promise.resolve(price);
					}
					const id = price.id;
					const normalizedPriceFields = cloneAndNormalizePrice(price);
					// if it's a newly added price
					if (!id) {
						return new Promise((resolve, onError) => {
							const onCompleted = ({ createEspressoPrice: { espressoPrice: price } }): void => {
								createdPriceIds.push(price.id);
								resolve(price);
							};
							createEntity({ ...normalizedPriceFields, ticketId: ticket.id }, { onCompleted, onError });
						});
					}
					return new Promise((resolve, onError) => {
						const onCompleted = ({ updateEspressoPrice: { espressoPrice: price } }): void => {
							updatedPriceIds.push(price.id);
							resolve(price);
						};
						updateEntity({ id, ...normalizedPriceFields }, { onCompleted, onError });
					});
				})
			);

			// the unlucky prices.
			const deletedPriceIds = difference(existingPriceIds, updatedPriceIds);
			// Delete all unlucky ones
			await Promise.all(
				deletedPriceIds.map((id) => {
					return new Promise((onCompleted, onError) => deleteEntity({ id }, { onCompleted, onError }));
				})
			);

			const normalizedTicketFields = {
				...ticket,
				price: parsedAmount(ticket.price || '0'),
				reverseCalculate: toBoolean(ticket.reverseCalculate),
			};
			// Finally update the ticket price relation
			updateTicket({ ...normalizedTicketFields, prices: [...updatedPriceIds, ...createdPriceIds] });
		},
		[existingPriceIds, createEntity, updateEntity, deleteEntity, updateTicket]
	);
};

export default useOnSubmitPrices;
