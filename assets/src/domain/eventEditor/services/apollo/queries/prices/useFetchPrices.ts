import { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useToaster, useLoadingToast } from '../../../../../../application/services/toaster';
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

	const dismissLoading = (): void => toaster.dismiss(loadingToastKey.current);

	const { data, error, loading } = useQuery<PricesList>(query, {
		...options,
		skip,
		onCompleted: (): void => {
			setIsLoaded(TypeName.prices, true);
			dismissLoading();
			toaster.success({ message: 'prices initialized' });
		},
		onError: (error): void => {
			setIsError(TypeName.prices, true);
			dismissLoading();
			toaster.error({ message: error.message });
		},
	});

	useLoadingToast({ loading, message: 'initializing prices', toastKey: loadingToastKey.current });

	useEffect(() => {
		setIsLoading(TypeName.prices, loading);
	}, [loading]);

	return {
		data,
		error,
		loading,
	};
};

export default useFetchPrices;
