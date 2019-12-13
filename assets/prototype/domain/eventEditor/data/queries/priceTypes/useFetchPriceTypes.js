import { useQuery } from '@apollo/react-hooks';
import { useEffect } from '@wordpress/element';
import { GET_PRICE_TYPES } from './priceTypes';
import useInitToaster from '../../../../../application/services/toaster/useInitToaster';
import useStatus from '../../../../../application/services/apollo/status/useStatus';

const useFetchPriceTypes = () => {
	console.log('%c useFetchPriceTypes: ', 'color: deeppink; font-size: 14px;');

	const { setIsLoading, setIsLoaded, setIsError } = useStatus();

	const { onCompleted, onError, initializationNotices } = useInitToaster({
		loadingMessage: `initializing price types`,
		successMessage: 'price types initialized',
	});

	const { data, error, loading } = useQuery(GET_PRICE_TYPES, {
		onCompleted: (data) => {
			setIsLoaded('priceTypes', true);
			onCompleted(data);
		},
		onError: (error) => {
			setIsError('priceTypes', true);
			onError(error);
		},
	});

	useEffect(() => {
		setIsLoading('priceTypes', loading);
	}, [loading]);

	initializationNotices(loading, error);

	return {
		data,
		error,
		loading,
	};
};

export default useFetchPriceTypes;
