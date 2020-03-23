import { useMemo } from 'react';
import { useRelations } from '@appServices/apollo/relations';
import { entitiesWithGuIdInArray } from '@sharedServices/predicates';
import useTickets from './useTickets';
import { Ticket } from '../../types';
import { RelatedEntitiesHook } from '../types';

const useRelatedTickets: RelatedEntitiesHook<Ticket, 'tickets'> = ({ entity, entityId }) => {
	const tickets = useTickets();
	const { getRelations } = useRelations();
	const relatedTicketIds = getRelations({
		entity,
		entityId,
		relation: 'tickets',
	});

	return useMemo(() => {
		return relatedTicketIds.length ? entitiesWithGuIdInArray(tickets, relatedTicketIds) : [];
	}, [relatedTicketIds.length, tickets]);
};

export default useRelatedTickets;
