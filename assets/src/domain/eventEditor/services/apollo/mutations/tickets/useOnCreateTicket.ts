import { pathOr } from 'ramda';
import { useRelations, RelationsManager } from '../../../../../../application/services/apollo/relations';
import useUpdateTicketCache from './useUpdateTicketCache';
import updatePriceCache from './updatePriceCache';
import { TicketMutationCallbackFn, TicketMutationCallbackFnArgs, CacheUpdaterFn } from '../types';
import { Ticket, Price } from '../../types';

const useOnCreateTicket = (): TicketMutationCallbackFn => {
	const { updateRelations, addRelation } = useRelations() as RelationsManager;

	const updateTicketCache: CacheUpdaterFn = useUpdateTicketCache();

	const onCreateTicket = ({ proxy, datetimeIds, ticket, tickets, prices }: TicketMutationCallbackFnArgs): void => {
		if (ticket.id) {
			const { nodes = [] } = tickets;
			const ticketIn: string[] = nodes.map(({ id }: Ticket) => id);
			const { id: ticketId } = ticket;

			// Update prices cache for the changed tickets,
			// to avoid refetching of prices.
			updatePriceCache({ proxy, prices, ticketIn, ticketId });

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
			const priceIds = pathOr<Price[]>([], ['nodes'], prices).map(({ id }: Price) => id);
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
		updateTicketCache({ proxy, tickets, ticket });
	};

	return onCreateTicket;
};

export default useOnCreateTicket;
