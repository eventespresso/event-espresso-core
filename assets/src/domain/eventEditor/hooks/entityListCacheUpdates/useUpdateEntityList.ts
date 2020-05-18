import { CacheUpdaterFn, useUpdateCache, WriteQueryOptions } from '@dataServices/apollo/queries';

/**
 * Updates entity list Apollo cache
 */
const useUpdateEntityList = <List = any>(
	writeQueryOptions: WriteQueryOptions<List> = undefined
): CacheUpdaterFn<List> => {
	return useUpdateCache<List>(writeQueryOptions);
};

export default useUpdateEntityList;
