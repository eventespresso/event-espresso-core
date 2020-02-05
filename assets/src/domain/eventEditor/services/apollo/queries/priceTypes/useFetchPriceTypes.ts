import { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import useInitToaster from '../../../../../application/services/toaster/useInitToaster';
import usePriceTypeQueryOptions from './usePriceTypeQueryOptions';
import { useStatus, TypeName } from '../../../../../application/services/apollo/status';
import { FetchEntitiesResult } from '../types';
import { PriceTypesList } from '../../types';

const useFetchPriceTypes = (): FetchEntitiesResult<PriceTypesList> => {
	const { setIsLoading, setIsLoaded, setIsError } = useStatus();
	const { query, ...options } = usePriceTypeQueryOptions();

	const { onCompleted, onError, initializationNotices } = useInitToaster({
		loadingMessage: `initializing price types`,
		successMessage: 'price types initialized',
	});

	const { data, error, loading } = useQuery<PriceTypesList>(query, {
		...options,
		onCompleted: (): void => {
			setIsLoaded(TypeName.priceTypes, true);
			onCompleted();
		},
		onError: (error): void => {
			setIsError(TypeName.priceTypes, true);
			onError(error);
		},
	});

	useEffect(() => {
		setIsLoading(TypeName.priceTypes, loading);
	}, [loading]);

	initializationNotices(loading, error);

	return {
		data,
		error,
		loading,
	};
};

export default useFetchPriceTypes;
