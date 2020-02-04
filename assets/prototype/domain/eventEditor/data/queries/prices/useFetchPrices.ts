import { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import useInitToaster from '../../../../../application/services/toaster/useInitToaster';
import { useStatus, TypeName } from '../../../../../application/services/apollo/status';
import usePriceQueryOptions from './usePriceQueryOptions';
import { FetchEntitiesResult } from '../types';
import { PricesList } from '../../types';

const useFetchPrices = (skipFetch: boolean = undefined): FetchEntitiesResult<PricesList> => {
	const { setIsLoading, setIsLoaded, setIsError, isLoaded } = useStatus();
	const { query, ...options } = usePriceQueryOptions();
	const { ticketIn } = options.variables.where;
	// do not fetch if we don't have any tickets
	// or prices have already been fetched
	const skip = typeof skipFetch !== 'undefined' ? skipFetch : !ticketIn.length || isLoaded(TypeName.prices);

	const { onCompleted, onError, initializationNotices } = useInitToaster({
		loadingMessage: `initializing prices`,
		successMessage: 'prices initialized',
	});

	const { data, error, loading } = useQuery<PricesList>(query, {
		...options,
		skip,
		onCompleted: (): void => {
			setIsLoaded(TypeName.prices, true);
			onCompleted();
		},
		onError: (error): void => {
			setIsError(TypeName.prices, true);
			onError(error);
		},
	});

	useEffect(() => {
		setIsLoading(TypeName.prices, loading);
	}, [loading]);

	initializationNotices(loading, error);

	return {
		data,
		error,
		loading,
	};
};

export default useFetchPrices;
