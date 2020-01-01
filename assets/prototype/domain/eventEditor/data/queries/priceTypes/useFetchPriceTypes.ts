import { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_PRICE_TYPES } from './';
import useInitToaster from '../../../../../application/services/toaster/useInitToaster';
import { useStatus, TypeName } from '../../../../../application/services/apollo/status';
import { FetchEntitiesResult } from '../types';

const useFetchPriceTypes = (): FetchEntitiesResult => {
	const { setIsLoading, setIsLoaded, setIsError } = useStatus();

	const { onCompleted, onError, initializationNotices } = useInitToaster({
		loadingMessage: `initializing price types`,
		successMessage: 'price types initialized',
	});

	const { data, error, loading } = useQuery(GET_PRICE_TYPES, {
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
