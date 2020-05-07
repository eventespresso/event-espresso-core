import { QueryHookOptions } from '@apollo/react-hooks';
import { QueryResult as ApolloQueryResult } from '@apollo/react-common';

import { useCacheQuery } from '@dataServices/apollo/queries';
import { AttendeesList, AttendeesQueryArgs } from './types';
import { EntityEdge } from '@dataServices/types';

type QueryOptions<Edge extends EntityEdge> = QueryHookOptions<AttendeesList<Edge>, AttendeesQueryArgs>;
type QueryResult<Edge extends EntityEdge> = ApolloQueryResult<AttendeesList<Edge>, AttendeesQueryArgs>;

const useAttendeesQuery = <AttendeeEdge extends EntityEdge>(
	queryOptions: QueryOptions<AttendeeEdge>
): QueryResult<AttendeeEdge> => {
	return useCacheQuery<AttendeesList<AttendeeEdge>>(queryOptions);
};

export default useAttendeesQuery;
