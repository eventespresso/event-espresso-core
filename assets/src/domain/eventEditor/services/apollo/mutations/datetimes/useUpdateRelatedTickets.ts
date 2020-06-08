import { useCallback } from 'react';

import type { EntityId } from '@dataServices/types';
import type { Ticket } from '@edtrServices/apollo';
import { useRelatedTickets, useTickets } from '@edtrServices/apollo/queries';
import { useTicketMutator, UpdateTicketInput } from '@edtrServices/apollo/mutations';
import { entitiesWithGuIdInArray } from '@sharedServices/predicates';

type InputGenerator = (ticket: Ticket) => UpdateTicketInput;
type UpdateCallback = (inputGenerator: InputGenerator, relatedTicketIds?: Array<EntityId>) => void;

const useUpdateRelatedTickets = (datetimeId: EntityId): UpdateCallback => {
	const tickets = useTickets();
	const prevRelatedTickets = useRelatedTickets({ entity: 'datetimes', entityId: datetimeId });
	const { updateEntity } = useTicketMutator();

	return useCallback<UpdateCallback>(
		(generateInput, relatedTicketIds = []) => {
			/**
			 * As of now, TAM can't be submitted without a date being related to a ticket
			 * So, if this function is called after submission of multi-step and
			 * `relatedTicketIds` is not empty, it means that related tickets were changed in TAM.
			 * So, we will only update `quantity` for the assigned tickets if needed
			 *
			 * Otherwise if `relatedTicketIds` is empty, it means that ticket assignments remained
			 * unchanged in multi-step or date capacity was changed using inline edit input
			 */
			const ticketsToUpdate = relatedTicketIds?.length
				? entitiesWithGuIdInArray(tickets, relatedTicketIds)
				: prevRelatedTickets;

			ticketsToUpdate.forEach((ticket) => {
				const input = generateInput(ticket);
				updateEntity({ id: ticket.id, ...input });
			});
		},
		[prevRelatedTickets, tickets, updateEntity]
	);
};

export default useUpdateRelatedTickets;
