import { WriteQueryOptions } from '../../../../eventEditor/data/queries/types';
import { CacheUpdaterFn } from '../types';
import useUpdateCache from '../useUpdateCache';

const useUpdateEntityList = <List = any>(
	writeQueryOptions: WriteQueryOptions<List> = undefined
): CacheUpdaterFn<List> => {
	return useUpdateCache<List>(writeQueryOptions);
};

export default useUpdateEntityList;
