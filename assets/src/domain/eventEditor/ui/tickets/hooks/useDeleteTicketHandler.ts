import { useCallback } from 'react';
import { assocPath } from 'ramda';

import useTicketPrices from '@edtrServices/apollo/queries/tickets/useTicketPrices';
import type { EntityId } from '@dataServices/types';
import { useTicketMutator } from '@edtrServices/apollo/mutations';
import { getGuids } from '@appServices/predicates';
import { usePriceQueryOptions } from '@edtrServices/apollo/queries';
import type { PricesList } from '@edtrServices/apollo';
import { useApolloClient } from '@apollo/react-hooks';

type Callback = (deletePermanently?: boolean) => Promise<void>;

const useDeleteTicketHandler = (id: EntityId): Callback => {
	const { deleteEntity: deleteTicket } = useTicketMutator();
	const relatedPrices = useTicketPrices(id);
	const priceQueryOptions = usePriceQueryOptions();
	const client = useApolloClient();

	/**
	 * Deletes the related prices from Apollo cache,
	 * permanent deletion is handled server-side
	 */
	const deleteRelatedPrices = useCallback<VoidFunction>(() => {
		// The prices that are not default or tax prices.
		const pricesToDelete = relatedPrices.filter(({ isDefault, isTax }) => !isDefault && !isTax);
		// if we have nothing to delete
		if (!pricesToDelete.length) {
			return;
		}
		const priceIdsToDelete = getGuids(pricesToDelete);
		// read existing data from Apollo cache
		const data = client.readQuery<PricesList>(priceQueryOptions);
		// filter out the related prices from Apollo cache data
		const pricesToRetain = data?.espressoPrices?.nodes?.filter(({ id }) => !priceIdsToDelete.includes(id)) || [];
		// avoid the dirty object creation using assocPath
		const newData = assocPath(['espressoPrices', 'nodes'], pricesToRetain, data);

		// write the data back to cache
		client.writeQuery<PricesList>({
			...priceQueryOptions,
			data: newData,
		});
	}, [client, relatedPrices]);

	return useCallback<Callback>(
		(deletePermanently) => {
			return (
				deleteTicket({ id, deletePermanently })
					// delete prices only if ticket is deleted permanently
					.then(() => deletePermanently && deleteRelatedPrices())
					.catch(console.error)
			);
		},
		[deleteTicket, id, deleteRelatedPrices]
	);
};

export default useDeleteTicketHandler;
