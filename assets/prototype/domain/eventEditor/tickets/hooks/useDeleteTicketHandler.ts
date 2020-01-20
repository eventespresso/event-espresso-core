import { useCallback } from 'react';

import { useEntityMutator, EntityType } from '../../../../application/services/apollo/mutations';
import useTicketPrices from '../../data/queries/tickets/useTicketPrices';
import { ListItemProps } from '../../types';
import { BackwardSubscription } from '../../../../application/services/apollo/mutations';

type VoidFn = () => void;

const useDeleteTicketHandler = ({ id }: ListItemProps): VoidFn => {
	const { deleteEntity: deleteTicket } = useEntityMutator(EntityType.Ticket);
	const relatedPrices = useTicketPrices(id);
	const { deleteEntity: deletePrice } = useEntityMutator(EntityType.Price);

	return useCallback<VoidFn>((): void => {
		const subscriptions: BackwardSubscription = {
			onCompleted: (): void => {
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
	}, [id]);
};

export default useDeleteTicketHandler;
