import { useCallback } from 'react';

import useTicketPrices from '@edtrServices/apollo/queries/tickets/useTicketPrices';
import { EntityListItemProps } from '@appLayout/entityList';
import { BackwardSubscription } from '@appServices/apollo/mutations';
import { useTicketMutator, usePriceMutator } from '@edtrServices/apollo/mutations';
import { getGuids } from '@appServices/predicates';

type VoidFn = () => void;

const useDeleteTicketHandler = ({ id }: EntityListItemProps): VoidFn => {
	const { deleteEntity: deleteTicket } = useTicketMutator();
	const relatedPrices = useTicketPrices(id);
	const { deleteEntity: deletePrice } = usePriceMutator();

	return useCallback<VoidFn>((): void => {
		const subscriptions: BackwardSubscription = {
			onCompleted: (): void => {
				// The prices that are not default or tax prices.
				const pricesToDelete = relatedPrices.filter(({ isDefault, isTax }) => !isDefault && !isTax);
				const priceIdsToDelete = getGuids(pricesToDelete);
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
