import { PriceTypesList } from '../services/apollo/types';
import { WriteQueryOptions } from '../services/apollo/queries/types';
import useUpdateEntityList from './useUpdateEntityList';
import usePriceTypeQueryOptions from '../services/apollo/queries/priceTypes/usePriceTypeQueryOptions';
import { CacheUpdaterFn } from '../../shared/services/apollo/queries/types';

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
