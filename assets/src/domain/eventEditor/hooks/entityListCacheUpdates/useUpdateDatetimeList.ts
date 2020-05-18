import useUpdateEntityList from './useUpdateEntityList';
import { useDatetimeQueryOptions, DatetimesList } from '@edtrServices/apollo';
import { CacheUpdaterFn, WriteQueryOptions } from '@dataServices/apollo/queries';

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
