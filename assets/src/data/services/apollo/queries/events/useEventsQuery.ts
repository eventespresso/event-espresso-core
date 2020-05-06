import { QueryHookOptions } from '@apollo/react-hooks';
import { QueryResult } from '@apollo/react-common';

import { useCacheQuery } from '@dataServices/apollo/queries';
import { EventsList, EventsQueryArgs } from './types';
import { EntityEdge } from '@dataServices/types';

const useEventsQuery = <EventEdge extends EntityEdge>(
	queryOptions: QueryHookOptions<EventsList<EventEdge>, EventsQueryArgs>
): QueryResult<EventsList<EventEdge>, EventsQueryArgs> => {
	return useCacheQuery<EventsList<EventEdge>>(queryOptions);
};

export default useEventsQuery;
