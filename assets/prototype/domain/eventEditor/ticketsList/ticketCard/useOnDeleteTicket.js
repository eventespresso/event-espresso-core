import useEntityMutator from '../../containers/mutations/useEntityMutator';
import useTicketPrices from '../../containers/queries/useTicketPrices';

const useOnDeleteTicket = ({ id }) => {
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

export default useOnDeleteTicket;
