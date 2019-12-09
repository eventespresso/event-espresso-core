import { useQuery } from '@apollo/react-hooks';
import { useEffect, useState } from '@wordpress/element';
import { GET_PRICE_TYPES } from './priceTypes';
import useToaster from '../../../../infrastructure/services/toaster/useToaster';
import useStatus from '../../../../infrastructure/services/status/useStatus';

const useFetchPriceTypes = () => {
	console.log('%c useFetchPriceTypes: ', 'color: deeppink; font-size: 14px;');
	const [initialized, setInitialized] = useState(false);
	const { setIsLoading, setIsLoaded, setIsError } = useStatus();

	const toaster = useToaster();
	const toasterMessage = 'initializing price types';

	const { data, error, loading } = useQuery(GET_PRICE_TYPES, {
		onCompleted: () => {
			toaster.dismiss(toasterMessage);
			toaster.success(`price types initialized`);
		},
		onError: (error) => {
			toaster.dismiss(toasterMessage);
			toaster.error(error);
		},
	});

	useEffect(() => {
		setIsLoading('priceTypes', loading);
		setIsLoaded('priceTypes', !!data);
		setIsError('priceTypes', !!error);
	}, [data, error, loading]);

	if (!initialized) {
		toaster.loading(loading, toasterMessage);
		toaster.error(error);
	}

	useEffect(() => {
		if (!initialized && !loading) {
			setInitialized(true);
		}
	}, [initialized]);

	return {
		data,
		error,
		loading,
	};
};

export default useFetchPriceTypes;
