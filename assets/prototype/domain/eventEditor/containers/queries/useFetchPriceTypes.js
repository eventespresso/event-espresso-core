import { useQuery } from '@apollo/react-hooks';
import { GET_PRICE_TYPES } from './priceTypes';
import useInitToaster from '../../../../infrastructure/services/toaster/useInitToaster';

const useFetchPriceTypes = () => {
	console.log('%c useFetchPriceTypes: ', 'color: deeppink; font-size: 14px;');

	const { onCompleted, onError, initializationNotices } = useInitToaster({
		loadingMessage: `initializing price types`,
		successMessage: 'price types initialized',
	});

	const { data, error, loading } = useQuery(GET_PRICE_TYPES, { onCompleted, onError });
	initializationNotices(loading, error);

	return {
		data,
		error,
		loading,
	};
};

export default useFetchPriceTypes;
