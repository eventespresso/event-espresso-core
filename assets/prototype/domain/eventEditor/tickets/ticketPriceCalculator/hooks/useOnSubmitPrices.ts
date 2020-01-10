import { difference } from 'ramda';

import { TpcFormData } from '../types';
import { Price } from '../../../data/types';
import { copyPriceFields } from '../../../../shared/predicates/prices/updatePredicates';
import { useEntityMutator, EntityType } from '../../../../../application/services/apollo/mutations';
import toBoolean from '../../../../../application/utilities/converters/toBoolean';
import parsedAmount from '../../../../../application/utilities/money/parsedAmount';

const useOnSubmitPrices = (existingPrices: Price[]) => {
	const { createEntity, updateEntity, deleteEntity } = useEntityMutator(EntityType.Price);
	const { updateEntity: updateTicket } = useEntityMutator(EntityType.Ticket);
	const existingPriceIds = existingPrices.map(({ id }) => id);

	// Async to make sure that prices are handled before updating the ticket.
	return async ({ ticket, prices = [] }: TpcFormData) => {
		const updatedPriceIds = [];
		const createdPriceIds = [];

		// make sure to complete all price operations before updating the ticket
		await Promise.all(
			// covert the price operations into promises
			prices.map((price: Price) => {
				if (price.id === 'NEW_PRICE') {
					return Promise.resolve(price);
				}
				const { id, ...priceFields } = copyPriceFields(price);
				const normalizedPriceFields = {
					...priceFields,
					amount: parsedAmount(price.amount || '0'),
					isDefault: toBoolean(price.isDefault),
					order: parseInt(price.order, 10),
				};
				// if it's a newly added price
				if (!id) {
					return new Promise((resolve, onError) => {
						const onCompleted = ({ createEspressoPrice: { espressoPrice: price } }) => {
							createdPriceIds.push(price.id);
							resolve(price);
						};
						createEntity({ ...normalizedPriceFields, ticketId: ticket.id }, { onCompleted, onError });
					});
				}
				return new Promise((resolve, onError) => {
					const onCompleted = ({ updateEspressoPrice: { espressoPrice: price } }) => {
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
	};
};

export default useOnSubmitPrices;
