import useEntityMutator from '../../../../application/services/apollo/mutations/useEntityMutator';
import useTicketPrices from '../../data/queries/tickets/useTicketPrices';

const useDeleteTicketHandler = ({ id }) => {
	const { deleteEntity: deleteTicket } = useEntityMutator('Ticket');
	const relatedPrices = useTicketPrices(id);
	const { deleteEntity: deletePrice } = useEntityMutator('Price');

	return () => {
		const subscriptions = {
			onCompleted: () => {
				// The prices that are not default or tax prices.
				const pricesToDelete = relatedPrices.filter(({ isDefault, isTax }) => !isDefault && !isTax);
				const priceIdsToDelete = pricesToDelete.map(({ id }) => id);
				priceIdsToDelete.forEach((id) => {
					deletePrice({ id });
				});
			},
			onError: console.error,
		};
		deleteTicket({ id }, subscriptions);
	};
};

export default useDeleteTicketHandler;
