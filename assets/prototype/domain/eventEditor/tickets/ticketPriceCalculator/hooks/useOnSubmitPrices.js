import { pick, difference } from 'ramda';
import useEntityMutator from '../../../containers/mutations/useEntityMutator';

const PRICE_INPUT_FIELDS = [
	'id',
	'amount',
	'desc',
	'isDefault',
	'name',
	'order',
	'overrides',
	'parent',
	'priceType',
	'wpUser',
];

const parseBooleanField = (value) => {
	value = typeof value === 'string' ? value.toLowerCase().trim() : value;
	switch (value) {
		case 'true':
		case 'yes':
		case '1':
			return true;
		case 'false':
		case 'no':
		case '0':
			return false;
		default:
			return Boolean(value);
	}
};

const useOnSubmitPrices = (existingPrices) => {
	const { createEntity, updateEntity, deleteEntity } = useEntityMutator('Price');
	const { updateEntity: updateTicket } = useEntityMutator('Ticket');
	const existingPriceIds = existingPrices.map(({ id }) => id);

	// Async to make sure that prices are handled before updating the ticket.
	return async (formData) => {
		console.log('%c Ticket Price Calculator Form Submit', 'color:YellowGreen;', formData);
		const { ticket, prices = [] } = formData;

		const updatedPriceIds = [];
		const createdPriceIds = [];

		// make sure to complete all price operations before updating the ticket
		await Promise.all(
			// covert the price operations into promises
			prices.map((price) => {
				if (price.id === 'NEW_PRICE') {
					return Promise.resolve(price);
				}
				const { id, ...input } = pick(PRICE_INPUT_FIELDS, price);
				const normalizedPriceFields = {
					...input,
					amount: parseFloat(price.amount || 0),
					isDefault: parseBooleanField(price.isDefault),
					order: parseInt(price.order, 10),
				};
				// if it's a newly added price
				if (!id) {
					return new Promise((resolve, onError) => {
						const onCompleted = ({ createPrice: { price } }) => {
							createdPriceIds.push(price.id);
							resolve(price);
						};
						createEntity({ ...normalizedPriceFields, ticketId: ticket.id }, { onCompleted, onError });
					});
				}
				return new Promise((resolve, onError) => {
					const onCompleted = ({ updatePrice: { price } }) => {
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
			price: parseFloat(ticket.price || 0),
			reverseCalculate: parseBooleanField(ticket.reverseCalculate),
		};
		// Finally update the ticket price relation
		updateTicket({ ...normalizedTicketFields, prices: [...updatedPriceIds, ...createdPriceIds] });
	};
};

export default useOnSubmitPrices;
