import { useCallback } from 'react';

import updatePriceCache from './updatePriceCache';
import useUpdateTicketCache from './useUpdateTicketCache';
import { TicketMutationCallbackFn, TicketMutationCallbackFnArgs } from '../types';
import { useRelations } from '@appServices/apollo/relations';
import { getGuids } from '@appServices/predicates';

const useOnCreateTicket = (): TicketMutationCallbackFn => {
	const { addRelation, updateRelations } = useRelations();

	const updateTicketCache = useUpdateTicketCache();

	const onCreateTicket = useCallback(
		({ proxy, datetimeIds, ticket, tickets, prices }: TicketMutationCallbackFnArgs): void => {
			if (ticket.id) {
				const { nodes = [] } = tickets;
				const ticketIn = getGuids(nodes);
				const { id: ticketId } = ticket;

				// Update prices cache for the changed tickets,
				// to avoid refetching of prices.
				updatePriceCache({ proxy, prices, ticketIn, ticketId, action: 'add' });

				// Set relations with datetimes
				updateRelations({
					entity: 'tickets',
					entityId: ticketId,
					relation: 'datetimes',
					relationIds: datetimeIds,
				});
				datetimeIds.forEach((entityId: string) => {
					addRelation({
						entity: 'datetimes',
						entityId,
						relation: 'tickets',
						relationId: ticketId,
					});
				});

				// Set relations with prices
				const priceIds = getGuids(prices?.nodes || []);
				updateRelations({
					entity: 'tickets',
					entityId: ticketId,
					relation: 'prices',
					relationIds: priceIds,
				});
				priceIds.forEach((entityId: string) => {
					addRelation({
						entity: 'prices',
						entityId,
						relation: 'tickets',
						relationId: ticketId,
					});
				});
			}
			// Update ticket cache after price cache is updated.
			updateTicketCache({ proxy, tickets, ticket, action: 'add' });
		},
		[addRelation, updateRelations, updateTicketCache]
	);

	return onCreateTicket;
};

export default useOnCreateTicket;
