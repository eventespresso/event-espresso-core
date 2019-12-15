import { useQuery } from '@apollo/react-hooks';
import { useEffect } from '@wordpress/element';
import { GET_PRICES } from './';
import useInitToaster from '../../../../../application/services/toaster/useInitToaster';
import useStatus from '../../../../../application/services/apollo/status/useStatus';
import usePriceQueryOptions from './usePriceQueryOptions';
import useTicketIds from '../tickets/useTicketIds';

const useFetchPrices = () => {
	console.log('%c useFetchPrices: ', 'color: deeppink; font-size: 14px;');

	const { setIsLoading, setIsLoaded, setIsError } = useStatus();
	const options = usePriceQueryOptions();
	const ticketIn = useTicketIds();

	const { onCompleted, onError, initializationNotices } = useInitToaster({
		loadingMessage: `initializing prices`,
		successMessage: 'prices initialized',
	});

	const { data, error, loading } = useQuery(GET_PRICES, {
		...options,
		skip: !ticketIn.length, // do not fetch if we don't have any tickets
		onCompleted: (data) => {
			setIsLoaded('prices', true);
			onCompleted(data);
		},
		onError: (error) => {
			setIsError('prices', true);
			onError(error);
		},
	});

	useEffect(() => {
		setIsLoading('prices', loading);
	}, [loading]);

	initializationNotices(loading, error);

	return {
		data,
		error,
		loading,
	};
};

export default useFetchPrices;
