import { useApolloClient } from '@apollo/react-hooks';

import useDatetimeQueryOptions from '../useDatetimeQueryOptions';
import { WriteQueryOptions } from '@dataServices/apollo/queries/types';
import { edge } from './data';

const useInitDatetimeTestCache = (espressoDatetimes = edge): void => {
	// init hooks
	const client = useApolloClient();
	const queryOptions = useDatetimeQueryOptions();

	const writeQueryOptions: WriteQueryOptions = {
		...queryOptions,
		data: {
			espressoDatetimes,
		},
	};
	try {
		// write the test data to cache
		client.writeQuery(writeQueryOptions);
	} catch (error) {
		console.error(error);
	}
};
export default useInitDatetimeTestCache;
