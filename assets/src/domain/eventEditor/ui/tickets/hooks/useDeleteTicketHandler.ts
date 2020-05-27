import { useCallback } from 'react';

import useTicketPrices from '@edtrServices/apollo/queries/tickets/useTicketPrices';
import { EntityListItemProps } from '@appLayout/entityList';
import { useTicketMutator, usePriceMutator } from '@edtrServices/apollo/mutations';
import { getGuids } from '@appServices/predicates';

const useDeleteTicketHandler = ({ id }: EntityListItemProps): VoidFunction => {
	const { deleteEntity: deleteTicket } = useTicketMutator();
	const relatedPrices = useTicketPrices(id);
	const { deleteEntity: deletePrice } = usePriceMutator();

	const onDeleteTicket = useCallback<VoidFunction>(() => {
		// The prices that are not default or tax prices.
		const pricesToDelete = relatedPrices.filter(({ isDefault, isTax }) => !isDefault && !isTax);
		const priceIdsToDelete = getGuids(pricesToDelete);
		priceIdsToDelete.forEach((id) => {
			deletePrice({ id });
		});
	}, [deletePrice, relatedPrices]);

	return useCallback<VoidFunction>((): void => {
		deleteTicket({ id }).then(onDeleteTicket).catch(console.error);
	}, [deleteTicket, id, onDeleteTicket]);
};

export default useDeleteTicketHandler;
