import { useApolloClient } from '@apollo/react-hooks';

import useDatetimeQueryOptions from '../useDatetimeQueryOptions';
import { ReadQueryOptions, WriteQueryOptions } from '../../../queries/types';
import useInitDatetimeStatus from './useInitDatetimeStatus';
import { edge } from './data';

const useInitDatetimeTestCache = (espressoDatetimes = edge): void => {
	// init hooks
	const client = useApolloClient();
	const queryOptions: ReadQueryOptions = useDatetimeQueryOptions();
	useInitDatetimeStatus();

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
