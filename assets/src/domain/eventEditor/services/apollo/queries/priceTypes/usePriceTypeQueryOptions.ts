import { GET_PRICE_TYPES } from '../priceTypes';
import { ReadQueryOptions } from '@dataServices/apollo/queries';

const usePriceTypeQueryOptions = (): ReadQueryOptions => {
	const options: ReadQueryOptions = {
		query: GET_PRICE_TYPES,
	};

	return options;
};

export default usePriceTypeQueryOptions;
