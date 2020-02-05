import { PricesList } from '../types';
import { WriteQueryOptions } from '../queries/types';
import useUpdateEntityList from './useUpdateEntityList';
import usePriceQueryOptions from '../queries/prices/usePriceQueryOptions';
import { CacheUpdaterFn } from '../../../shared/data/queries/types';

const useUpdatePriceList = (
	writeQueryOptions: WriteQueryOptions<PricesList> = undefined
): CacheUpdaterFn<PricesList> => {
	const queryOptions = usePriceQueryOptions();
	return useUpdateEntityList<PricesList>({
		...queryOptions,
		...writeQueryOptions,
	});
};

export default useUpdatePriceList;
