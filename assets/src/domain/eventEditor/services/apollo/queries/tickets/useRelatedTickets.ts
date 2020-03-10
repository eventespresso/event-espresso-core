import { useMemo } from 'react';
import { useRelations, RelationEntity } from '@appServices/apollo/relations';
import { entitiesWithGuIdInArray } from '@sharedServices/predicates';
import useTickets from './useTickets';
import { Ticket } from '../../types';
import { EntityId } from '@appServices/apollo/types';

interface RelatedTicketsProps {
	entity: Exclude<RelationEntity, 'tickets'>;
	entityId: EntityId;
}

const useRelatedTickets = ({ entity, entityId }: RelatedTicketsProps): Array<Ticket> => {
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
