import { useCallback } from 'react';
import { keys, pathOr, pickBy, hasPath } from 'ramda';

import { useRelations } from '@appServices/apollo/relations';
import { Ticket } from '@edtrServices/apollo';
import { useEdtrState } from '@edtrHooks/edtrState';
import { entitiesWithGuIdInArray } from '@sharedServices/predicates';

type IsChainedFilterCallback = (args: { isChained: boolean; tickets: Array<Ticket> }) => Array<Ticket>;
type IsChainedFilterDeps = any;

type IsChainedFilterTuple = [IsChainedFilterCallback, IsChainedFilterDeps];

const useIsChainedFilter = (): IsChainedFilterTuple => {
	const { getData } = useRelations();
	const { visibleDatetimeIds } = useEdtrState();

	const relatedTicketIds = keys(
		pickBy((relations) => {
			return (
				hasPath(['datetimes'], relations) &&
				pathOr([], ['datetimes'], relations).some((id) => visibleDatetimeIds.includes(id))
			);
		}, getData().tickets)
	);

	const relatedTicketIdsStr = JSON.stringify(relatedTicketIds);

	const callback = useCallback<IsChainedFilterCallback>(
		({ isChained, tickets }) => {
			// bail early
			if (!isChained) {
				return tickets;
			}

			return entitiesWithGuIdInArray(tickets, relatedTicketIds);
		},

		// eslint-disable-next-line react-hooks/exhaustive-deps
		[relatedTicketIdsStr]
	);

	return [callback, relatedTicketIdsStr];
};

export default useIsChainedFilter;
