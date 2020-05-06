import { QueryHookOptions } from '@apollo/react-hooks';
import { QueryResult } from '@apollo/react-common';

import { useCacheQuery } from '@dataServices/apollo/queries';
import { AttendeesList, AttendeesQueryArgs } from './types';
import { EntityEdge } from '@dataServices/types';

const useAttendeesQuery = <AttendeeEdge extends EntityEdge>(
	queryOptions: QueryHookOptions<AttendeesList<AttendeeEdge>, AttendeesQueryArgs>
): QueryResult<AttendeesList<AttendeeEdge>, AttendeesQueryArgs> => {
	return useCacheQuery<AttendeesList<AttendeeEdge>>(queryOptions);
};

export default useAttendeesQuery;
