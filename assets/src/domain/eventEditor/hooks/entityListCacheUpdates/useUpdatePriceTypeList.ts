import useUpdateEntityList from './useUpdateEntityList';
import { PriceTypesList, usePriceTypeQueryOptions, WriteQueryOptions } from '@edtrServices/apollo';
import { CacheUpdaterFn } from '@dataServices/apollo/queries';

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
