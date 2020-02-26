import { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useToaster } from '../../../../../../application/services/toaster';
import { useStatus, TypeName } from '../../../../../../application/services/apollo/status';
import usePriceQueryOptions from './usePriceQueryOptions';
import { FetchEntitiesResult } from '../types';
import { PricesList } from '../../types';

const useFetchPrices = (skipFetch: boolean = null): FetchEntitiesResult<PricesList> => {
	const { setIsLoading, setIsLoaded, setIsError, isLoaded } = useStatus();
	const { query, ...options } = usePriceQueryOptions();

	const { ticketIn } = options.variables.where;
	// do not fetch if we don't have any tickets
	// or prices have already been fetched
	const skip = skipFetch !== null ? skipFetch : !ticketIn.length || isLoaded(TypeName.prices);

	const toaster = useToaster();
	const loadingToastKey = useRef(toaster.generateKey());

	const { data, error, loading } = useQuery<PricesList>(query, {
		...options,
		skip,
		onCompleted: (): void => {
			setIsLoaded(TypeName.prices, true);
			toaster.dismiss(loadingToastKey.current);
			toaster.success({ message: 'prices initialized' });
		},
		onError: (error): void => {
			setIsError(TypeName.prices, true);
			toaster.dismiss(loadingToastKey.current);
			toaster.error({ message: error });
		},
	});

	useEffect(() => {
		setIsLoading(TypeName.prices, loading);
		if (loading && !toaster.isToastOpen(loadingToastKey.current)) {
			toaster.loading({
				key: loadingToastKey.current,
				message: 'initializing prices',
			});
		} else if (!loading) {
			toaster.dismiss(loadingToastKey.current);
		}
	}, [loading]);

	return {
		data,
		error,
		loading,
	};
};

export default useFetchPrices;
