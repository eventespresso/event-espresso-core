import { PriceTypesList } from '../types';
import { WriteQueryOptions } from '../queries/types';
import useUpdateEntityList from './useUpdateEntityList';
import usePriceTypeQueryOptions from '../queries/priceTypes/usePriceTypeQueryOptions';
import { CacheUpdaterFn } from '../../../shared/data/queries/types';

const useUpdatePriceTypeList = (
	writeQueryOptions: WriteQueryOptions<PriceTypesList> = undefined
): CacheUpdaterFn<PriceTypesList> => {
	const queryOptions = usePriceTypeQueryOptions();
	return useUpdateEntityList<PriceTypesList>({
		...queryOptions,
		...writeQueryOptions,
	});
};

export default useUpdatePriceTypeList;
