import { PricesList } from '../services/apollo/types';
import { WriteQueryOptions } from '../services/apollo/queries/types';
import useUpdateEntityList from './useUpdateEntityList';
import usePriceQueryOptions from '../services/apollo/queries/prices/usePriceQueryOptions';
import { CacheUpdaterFn } from '../../shared/services/apollo/queries/types';

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
