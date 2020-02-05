import { DatetimesList } from '../types';
import { WriteQueryOptions } from '../queries/types';
import useUpdateEntityList from './useUpdateEntityList';
import useDatetimeQueryOptions from '../queries/datetimes/useDatetimeQueryOptions';
import { CacheUpdaterFn } from '../../../shared/data/queries/types';

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
