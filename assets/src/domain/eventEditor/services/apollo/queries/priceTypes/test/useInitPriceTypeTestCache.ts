import { useApolloClient } from '@apollo/react-hooks';

import usePriceTypeQueryOptions from '../usePriceTypeQueryOptions';
import { WriteQueryOptions } from '@dataServices/apollo/queries/types';
import { edge } from './data';

const useInitPriceTypeTestCache = (espressoPriceTypes = edge): void => {
	// init hooks
	const client = useApolloClient();
	const queryOptions = usePriceTypeQueryOptions();

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
