import { WriteQueryOptions } from '../queries/types';
import { CacheUpdaterFn } from '../../../shared/data/queries/types';
import useUpdateCache from '../../../shared/data/queries/useUpdateCache';

const useUpdateEntityList = <List = any>(
	writeQueryOptions: WriteQueryOptions<List> = undefined
): CacheUpdaterFn<List> => {
	return useUpdateCache<List>(writeQueryOptions);
};

export default useUpdateEntityList;
