import { WriteQueryOptions } from '@edtrServices/apollo/queries';
import { CacheUpdaterFn, useUpdateCache } from '@sharedServices/apollo/queries';

const useUpdateEntityList = <List = any>(
	writeQueryOptions: WriteQueryOptions<List> = undefined
): CacheUpdaterFn<List> => {
	return useUpdateCache<List>(writeQueryOptions);
};

export default useUpdateEntityList;
