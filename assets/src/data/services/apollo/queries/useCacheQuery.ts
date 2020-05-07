import { useQuery, QueryHookOptions } from '@apollo/react-hooks';
import { QueryResult } from '@apollo/react-common';

const useCacheQuery = <TData = any>(queryOptions: QueryHookOptions): QueryResult<TData> => {
	const { query, ...options } = queryOptions;

	return useQuery<TData>(query, { fetchPolicy: 'cache-only', ...options });
};

export default useCacheQuery;
