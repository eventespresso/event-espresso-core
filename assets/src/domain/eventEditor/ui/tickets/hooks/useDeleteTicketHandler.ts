import { useCallback } from 'react';

import useTicketPrices from '../../../services/apollo/queries/tickets/useTicketPrices';
import { ListItemProps } from '../../../interfaces/types';
import { BackwardSubscription } from '../../../../../application/services/apollo/mutations';
import { useTicketMutator, usePriceMutator } from '@edtrServices/apollo/mutations';

type VoidFn = () => void;

const useDeleteTicketHandler = ({ id }: ListItemProps): VoidFn => {
	const { deleteEntity: deleteTicket } = useTicketMutator();
	const relatedPrices = useTicketPrices(id);
	const { deleteEntity: deletePrice } = usePriceMutator();

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
