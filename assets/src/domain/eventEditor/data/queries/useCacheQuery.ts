import { useQuery } from '@apollo/react-hooks';
import { QueryResult } from '@apollo/react-common';
import { ReadQueryOptions } from './types';

const useCacheQuery = <TData = any>(queryOptions: ReadQueryOptions): QueryResult<TData> => {
	const { query, ...options } = queryOptions;

	return useQuery<TData>(query, { fetchPolicy: 'cache-only', ...options });
};

export default useCacheQuery;
