import usePriceQueryOptions from './usePriceQueryOptions';
import { Price, PricesList } from '../../types';
import useCacheQuery from '../useCacheQuery';
/**
 * A custom react hook for retrieving all the prices from cache
 * limited to the ids passed in `include`
 */
const usePrices = (): Price[] => {
	const options = usePriceQueryOptions();
	const { data } = useCacheQuery<PricesList>(options);

	return data?.espressoPrices?.nodes || [];
};

export default usePrices;
