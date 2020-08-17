import { useCallback } from 'react';

import useUpdateTicketCache from './useUpdateTicketCache';
import { TicketMutationCallbackFn, TicketMutationCallbackFnArgs } from '../types';
import { useRelations } from '@appServices/apollo/relations';

const useOnUpdateTicket = (): TicketMutationCallbackFn => {
	const { addRelation, removeRelation, updateRelations } = useRelations();

	const updateTicketCache = useUpdateTicketCache();

	const onUpdateTicket = useCallback(
		({ proxy, tickets, ticket, datetimeIds, priceIds }: TicketMutationCallbackFnArgs): void => {
			if (!ticket?.id) {
				return;
			}

			const ticketId = ticket.id;
			// if related datetimes are passed
			// may be empty array to remove relations
			if (datetimeIds) {
				// make sure to remove ticket from
				// all existing relations
				removeRelation({
					entity: 'tickets',
					entityId: ticketId,
					relation: 'datetimes',
				});

				// if we have any datetime ids
				if (datetimeIds.length) {
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
				}
			}

			// if related prices are passed
			// may be empty array to remove relations
			if (priceIds) {
				// make sure to remove ticket from
				// all existing relations
				removeRelation({
					entity: 'tickets',
					entityId: ticketId,
					relation: 'prices',
				});

				// if we have any price ids
				if (priceIds.length) {
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
			}
			// Update ticket cache.
			updateTicketCache({ proxy, tickets, ticket, action: 'update' });
		},
		[addRelation, removeRelation, updateRelations, updateTicketCache]
	);

	return onUpdateTicket;
};

export default useOnUpdateTicket;
