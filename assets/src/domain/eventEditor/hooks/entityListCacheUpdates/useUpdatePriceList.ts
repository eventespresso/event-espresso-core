import useUpdateEntityList from './useUpdateEntityList';
import { PricesList, usePriceQueryOptions, WriteQueryOptions } from '@edtrServices/apollo';
import { CacheUpdaterFn } from '@dataServices/apollo/queries';

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
