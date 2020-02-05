import { useApolloClient } from '@apollo/react-hooks';

import usePriceQueryOptions from '../usePriceQueryOptions';
import { ReadQueryOptions, WriteQueryOptions } from '../../types';
import { edge } from './data';

const useInitPriceTestCache = (espressoPrices = edge): void => {
	// init hooks
	const client = useApolloClient();
	const queryOptions: ReadQueryOptions = usePriceQueryOptions();

	const writeQueryOptions: WriteQueryOptions = {
		...queryOptions,
		data: {
			espressoPrices,
		},
	};
	try {
		// write the test data to cache
		client.writeQuery(writeQueryOptions);
	} catch (error) {
		console.error(error);
	}
};
export default useInitPriceTestCache;
