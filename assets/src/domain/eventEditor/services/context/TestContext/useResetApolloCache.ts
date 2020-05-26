import { useEffect } from 'react';
import { useApolloClient } from '@apollo/react-hooks';

const useResetApolloCache = (): void => {
	const client = useApolloClient();

	useEffect(() => {
		// Make sure to clear Apollo cache on unmount
		// to avoid any unexpected results.
		return (): void => {
			client.resetStore();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};

export default useResetApolloCache;
