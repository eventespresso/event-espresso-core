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

	return (formData) => {
		console.log('%c Ticket Price Calculator Form Submit', 'color:YellowGreen;', formData);
		const { ticket, prices = [] } = formData;

		// Array containing the updated prices
		const updatedPrices = [];

		prices.forEach((price) => {
			if (price.id === 'NEW_PRICE') {
				return;
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
				createEntity({ ...normalizedPriceFields, ticketId: ticket.id });
			} else {
				updateEntity({ id, ...normalizedPriceFields });
			}
			updatedPrices.push(id);
		});

		// the unlucky prices.
		const deletedPrices = difference(existingPriceIds, updatedPrices);
		// Delete all unlucky ones
		deletedPrices.forEach((id) => {
			deleteEntity({ id });
		});

		const normalizedTicketFields = {
			...ticket,
			price: parseFloat(ticket.price || 0),
			reverseCalculate: parseBooleanField(ticket.reverseCalculate),
		};
		// Finally update the ticket price relation
		updateTicket({ ...normalizedTicketFields, prices: updatedPrices });
	};
};

export default useOnSubmitPrices;
