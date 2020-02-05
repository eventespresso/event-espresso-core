import { useApolloClient } from '@apollo/react-hooks';

import usePriceTypeQueryOptions from '../usePriceTypeQueryOptions';
import { ReadQueryOptions, WriteQueryOptions } from '../../types';
import { edge } from './data';

const useInitPriceTypeTestCache = (espressoPriceTypes = edge): void => {
	// init hooks
	const client = useApolloClient();
	const queryOptions: ReadQueryOptions = usePriceTypeQueryOptions();

	const writeQueryOptions: WriteQueryOptions = {
		...queryOptions,
		data: {
			espressoPriceTypes,
		},
	};
	try {
		// write the test data to cache
		client.writeQuery(writeQueryOptions);
	} catch (error) {
		console.error(error);
	}
};
export default useInitPriceTypeTestCache;
