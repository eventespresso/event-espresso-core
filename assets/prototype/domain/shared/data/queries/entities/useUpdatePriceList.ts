import { PricesList } from '../../../../eventEditor/data/types';
import { WriteQueryOptions } from '../../../../eventEditor/data/queries/types';
import useUpdateEntityList from './useUpdateEntityList';
import usePriceQueryOptions from '../../../../eventEditor/data/queries/prices/usePriceQueryOptions';
import { CacheUpdaterFn } from '../types';

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
