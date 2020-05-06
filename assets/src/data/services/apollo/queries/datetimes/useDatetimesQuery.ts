import { QueryHookOptions } from '@apollo/react-hooks';
import { QueryResult } from '@apollo/react-common';

import { useCacheQuery } from '@dataServices/apollo/queries';
import { DatetimesList, DatetimesQueryArgs } from './types';
import { EntityEdge } from '@dataServices/types';

const useDatetimesQuery = <DatetimeEdge extends EntityEdge>(
	queryOptions: QueryHookOptions<DatetimesList<DatetimeEdge>, DatetimesQueryArgs>
): QueryResult<DatetimesList<DatetimeEdge>, DatetimesQueryArgs> => {
	return useCacheQuery<DatetimesList<DatetimeEdge>>(queryOptions);
};

export default useDatetimesQuery;
