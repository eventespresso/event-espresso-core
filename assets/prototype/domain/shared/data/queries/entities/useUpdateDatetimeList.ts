import { DatetimesList } from '../../../../eventEditor/data/types';
import { WriteQueryOptions } from '../../../../eventEditor/data/queries/types';
import useUpdateEntityList from './useUpdateEntityList';
import useDatetimeQueryOptions from '../../../../eventEditor/data/queries/datetimes/useDatetimeQueryOptions';
import { CacheUpdaterFn } from '../types';

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
