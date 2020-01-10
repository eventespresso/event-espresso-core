import { PriceTypesList } from '../../../../eventEditor/data/types';
import { WriteQueryOptions } from '../../../../eventEditor/data/queries/types';
import useUpdateEntityList from './useUpdateEntityList';
import usePriceTypeQueryOptions from '../../../../eventEditor/data/queries/priceTypes/usePriceTypeQueryOptions';
import { CacheUpdaterFn } from '../types';

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
