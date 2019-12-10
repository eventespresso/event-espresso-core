import { useQuery } from '@apollo/react-hooks';
import { GET_PRICES } from './prices';
import useInitToaster from '../../../../infrastructure/services/toaster/useInitToaster';

const useFetchPrices = ({ ticketIn = [] }) => {
	console.log('%c useFetchPrices: ', 'color: deeppink; font-size: 14px;');

	const { onCompleted, onError, initializationNotices } = useInitToaster({
		loadingMessage: `initializing prices`,
		successMessage: 'prices initialized',
	});

	const { data, error, loading } = useQuery(GET_PRICES, {
		variables: {
			where: {
				ticketIn,
			},
		},
		skip: !ticketIn.length, // do not fetch if we don't have any tickets
		onCompleted,
		onError,
	});

	initializationNotices(loading, error);

	return {
		data,
		error,
		loading,
	};
};

export default useFetchPrices;
