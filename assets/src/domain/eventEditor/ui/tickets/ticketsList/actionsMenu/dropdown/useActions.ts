import { useCallback } from 'react';
import { omit } from 'ramda';
import { __ } from '@wordpress/i18n';

import { copyTicketFields } from '@sharedEntities/tickets/predicates/updatePredicates';
import { isTicketInputField } from '@sharedEntities/tickets/predicates/selectionPredicates';
import { isTrashed } from '@sharedServices/predicates';
import { useRelations } from '@appServices/apollo/relations';
import { useTicketItem } from '@edtrServices/apollo';
import { useTicketMutator } from '@edtrServices/apollo/mutations';

const useActions = ({ ticketId }) => {
	// Make sure to subscribe to Apollo cache
	// to avoid stale data
	const ticket = useTicketItem({ id: ticketId });

	if (!ticket) return {};

	const { id, cacheId } = ticket;

	const { createEntity } = useTicketMutator();
	const { deleteEntity } = useTicketMutator(id);
	const { getRelations } = useRelations();

	const datetimes = getRelations({
		entity: 'tickets',
		entityId: ticket.id,
		relation: 'datetimes',
	});

	const copyTicket = useCallback(() => {
		const newTicket = {
			...copyTicketFields(omit(['prices'], ticket), isTicketInputField),
		};

		return createEntity({ ...newTicket, datetimes });
	}, [ticket]);

	const trashed = isTrashed(ticket);

	const trashTicket = useCallback(() => deleteEntity({ id, deletePermanently: trashed }), [cacheId, trashed]);

	return {
		copyTicket,
		trashTicket,
		trashed,
	};
};

export default useActions;
