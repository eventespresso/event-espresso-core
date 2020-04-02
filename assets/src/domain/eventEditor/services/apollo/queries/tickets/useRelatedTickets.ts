import { useMemo } from 'react';
import { useRelations } from '@appServices/apollo/relations';
import { entitiesWithGuIdInArray } from '@sharedServices/predicates';
import useTickets from './useTickets';
import { Ticket } from '../../types';
import { RelatedEntitiesHook } from '../types';
import { entityListCacheIdString } from '@appServices/utilities/memo';

const useRelatedTickets: RelatedEntitiesHook<Ticket, 'tickets'> = ({ entity, entityId }) => {
	const tickets = useTickets();
	const { getRelations } = useRelations();
	const relatedTicketIds = getRelations({
		entity,
		entityId,
		relation: 'tickets',
	});

	const cacheIds = entityListCacheIdString(tickets);
	const relatedTicketIdsStr = JSON.stringify(relatedTicketIds);

	return useMemo(() => entitiesWithGuIdInArray(tickets, relatedTicketIds), [relatedTicketIdsStr, cacheIds]);
};

export default useRelatedTickets;
