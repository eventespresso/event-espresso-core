import { WriteQueryOptions } from '../services/apollo/queries/types';
import { CacheUpdaterFn } from '../../shared/services/apollo/queries/types';
import useUpdateCache from '../../shared/services/apollo/queries/useUpdateCache';

const useUpdateEntityList = <List = any>(
	writeQueryOptions: WriteQueryOptions<List> = undefined
): CacheUpdaterFn<List> => {
	return useUpdateCache<List>(writeQueryOptions);
};

export default useUpdateEntityList;
