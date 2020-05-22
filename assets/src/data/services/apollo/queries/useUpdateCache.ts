import { useCallback } from 'react';
import { useApolloClient } from '@apollo/react-hooks';

import { WriteQueryOptions, CacheUpdaterFn } from './types';

const useUpdateCache = <Data = any>(writeQueryOptions: WriteQueryOptions<Data>): CacheUpdaterFn<Data> => {
	const client = useApolloClient();

	return useCallback<CacheUpdaterFn<Data>>(
		(writeOptions?: WriteQueryOptions<Data>): void => {
			client.writeQuery<Data>({ ...writeQueryOptions, ...writeOptions });
		},
		[client, writeQueryOptions]
	);
};

export default useUpdateCache;
