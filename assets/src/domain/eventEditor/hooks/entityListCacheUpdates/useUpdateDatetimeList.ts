import useUpdateEntityList from './useUpdateEntityList';
import { useDatetimeQueryOptions, WriteQueryOptions, DatetimesList } from '@edtrServices/apollo';
import { CacheUpdaterFn } from '@dataServices/apollo/queries';

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
