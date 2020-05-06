import { QueryHookOptions } from '@apollo/react-hooks';
import { QueryResult } from '@apollo/react-common';

import { useCacheQuery } from '@dataServices/apollo/queries';
import { TicketsList, TicketsQueryArgs } from './types';
import { EntityEdge } from '@dataServices/types';

const useTicketsQuery = <TicketEdge extends EntityEdge>(
	queryOptions: QueryHookOptions<TicketsList<TicketEdge>, TicketsQueryArgs>
): QueryResult<TicketsList<TicketEdge>, TicketsQueryArgs> => {
	return useCacheQuery<TicketsList<TicketEdge>>(queryOptions);
};

export default useTicketsQuery;
