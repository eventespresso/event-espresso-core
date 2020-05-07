import { QueryHookOptions } from '@apollo/react-hooks';
import { QueryResult as ApolloQueryResult } from '@apollo/react-common';

import { useCacheQuery } from '@dataServices/apollo/queries';
import { TicketsList, TicketsQueryArgs } from './types';
import { EntityEdge } from '@dataServices/types';

type QueryOptions<Edge extends EntityEdge> = QueryHookOptions<TicketsList<Edge>, TicketsQueryArgs>;
type QueryResult<Edge extends EntityEdge> = ApolloQueryResult<TicketsList<Edge>, TicketsQueryArgs>;

const useTicketsQuery = <TicketEdge extends EntityEdge>(
	queryOptions: QueryOptions<TicketEdge>
): QueryResult<TicketEdge> => {
	return useCacheQuery<TicketsList<TicketEdge>>(queryOptions);
};

export default useTicketsQuery;
