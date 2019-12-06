import { useQuery } from '@apollo/react-hooks';
import { GET_PRICE_TYPES } from './priceTypes';
import useInitToaster from '../../../../infrastructure/services/toaster/useInitToaster';

const useFetchPriceTypes = () => {
	console.log('%c useFetchPriceTypes: ', 'color: deeppink; font-size: 14px;');
	const toasterMessage = 'initializing price types';

	const initToaster = useInitToaster({
		toasterMessage,
		loadingMessage: toasterMessage,
		successMessage: 'price types initialized'
	});

	const { data, error, loading } = useQuery(GET_PRICE_TYPES, initToaster);
	initToaster.initializationNotices(loading, error);

	return {
		data,
		error,
		loading,
	};
};

export default useFetchPriceTypes;
