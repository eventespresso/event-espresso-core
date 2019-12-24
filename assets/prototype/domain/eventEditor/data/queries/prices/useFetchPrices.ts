import { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_PRICES } from './';
import useInitToaster from '../../../../../application/services/toaster/useInitToaster';
import { useStatus, TypeName } from '../../../../../application/services/apollo/status';
import usePriceQueryOptions from './usePriceQueryOptions';
import useTicketIds from '../tickets/useTicketIds';
import { FetchEntitiesResult, ReadQueryOptions } from '../types';

const useFetchPrices = (): FetchEntitiesResult => {
	console.log('%c useFetchPrices: ', 'color: deeppink; font-size: 14px;');

	const { setIsLoading, setIsLoaded, setIsError } = useStatus();
	const options: ReadQueryOptions = usePriceQueryOptions();
	const ticketIn: string[] = useTicketIds();

	const { onCompleted, onError, initializationNotices } = useInitToaster({
		loadingMessage: `initializing prices`,
		successMessage: 'prices initialized',
	});

	const { data, error, loading } = useQuery(GET_PRICES, {
		...options,
		skip: !ticketIn.length, // do not fetch if we don't have any tickets
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
