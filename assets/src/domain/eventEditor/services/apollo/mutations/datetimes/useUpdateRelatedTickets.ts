import { useCallback } from 'react';

import { EntityId } from '@appServices/apollo/types';
import { Ticket } from '@edtrServices/apollo';
import { useRelatedTickets } from '@edtrServices/apollo/queries';
import { useTicketMutator, UpdateTicketInput } from '@edtrServices/apollo/mutations';

type InputGenerator = (ticket: Ticket) => UpdateTicketInput;
type UpdateCallback = (inputGenerator: InputGenerator) => void;

const useUpdateRelatedTickets = (datetimeId: EntityId): UpdateCallback => {
	const relatedTickets = useRelatedTickets({ entity: 'datetimes', entityId: datetimeId });
	const { updateEntity } = useTicketMutator();

	return useCallback<UpdateCallback>(
		(generateInput) => {
			relatedTickets.forEach((ticket) => {
				const input = generateInput(ticket);
				updateEntity({ id: ticket.id, ...input });
			});
		},
		[datetimeId, relatedTickets]
	);
};

export default useUpdateRelatedTickets;
