import { useMemo } from 'react';
import { useRelations } from '@appServices/apollo/relations';
import { entitiesWithGuIdInArray } from '@sharedServices/predicates';
import useTickets from './useTickets';
import { keys, pathOr, pickBy, pipe, hasPath } from 'ramda';

import { RelatedTicketsForDates } from '../types';

const useRelatedTicketsForDates = ({ datetimeIds }: RelatedTicketsForDates): any => {
	const tickets = useTickets();
	const { getData } = useRelations();
	const relatedTicketIds = keys(
		pickBy((relations) => {
			return (
				hasPath(['datetimes'], relations) &&
				pathOr([], ['datetimes'], relations).some((id) => datetimeIds.includes(id))
			);
		}, getData().tickets)
	);
	return useMemo(() => {
		return relatedTicketIds.length ? entitiesWithGuIdInArray(tickets, relatedTicketIds) : [];
	}, [relatedTicketIds, tickets]);
};

export default useRelatedTicketsForDates;
