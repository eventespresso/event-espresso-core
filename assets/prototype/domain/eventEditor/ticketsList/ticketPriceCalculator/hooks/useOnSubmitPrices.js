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
			// if it's a newly added price
			if (!id) {
				createEntity({ ...input, ticketId: ticket.id });
			} else {
				updateEntity({ id, ...input });
			}
			updatedPrices.push(id);
		});

		// the unlucky prices.
		const deletedPrices = difference(existingPriceIds, updatedPrices);
		// Delete all unlucky ones
		deletedPrices.forEach((id) => {
			deleteEntity({ id });
		});

		// Finally update the ticket price relation
		updateTicket({ ...ticket, prices: updatedPrices });
	};
};

export default useOnSubmitPrices;
