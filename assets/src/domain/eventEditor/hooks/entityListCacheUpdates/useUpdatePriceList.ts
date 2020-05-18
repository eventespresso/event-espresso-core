import useUpdateEntityList from './useUpdateEntityList';
import { PricesList, usePriceQueryOptions } from '@edtrServices/apollo';
import { CacheUpdaterFn, WriteQueryOptions } from '@dataServices/apollo/queries';

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
