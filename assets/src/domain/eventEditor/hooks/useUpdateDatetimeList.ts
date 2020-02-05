import { DatetimesList } from '../services/apollo/types';
import { WriteQueryOptions } from '../services/apollo/queries/types';
import useUpdateEntityList from './useUpdateEntityList';
import useDatetimeQueryOptions from '../services/apollo/queries/datetimes/useDatetimeQueryOptions';
import { CacheUpdaterFn } from '../../shared/services/apollo/queries/types';

const useUpdateDatetimeList = (
	writeQueryOptions: WriteQueryOptions<DatetimesList> = undefined
): CacheUpdaterFn<DatetimesList> => {
	const queryOptions = useDatetimeQueryOptions();
	return useUpdateEntityList<DatetimesList>({
		...queryOptions,
		...writeQueryOptions,
	});
};

export default useUpdateDatetimeList;
