import { useQuery } from '@apollo/react-hooks';
import { useEffect, useState } from '@wordpress/element';
import { GET_PRICES } from './prices';
import useToaster from '../../../../infrastructure/services/toaster/useToaster';

const useFetchPrices = ({ ticketIn = [] }) => {
	console.log('%c useFetchPrices: ', 'color: deeppink; font-size: 14px;');
	const [initialized, setInitialized] = useState(false);

	const toaster = useToaster();
	const toasterMessage = 'initializing prices';

	const { data, error, loading } = useQuery(GET_PRICES, {
		variables: {
			where: {
				ticketIn,
			}
		},
		skip: !ticketIn.length, // do not fetch if we don't have any tickets
		onCompleted: () => {
			toaster.dismiss(toasterMessage);
			toaster.success(`prices initialized`);
		},
		onError: (error) => {
			toaster.dismiss(toasterMessage);
			toaster.error(error);
		},
	});

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

export default useFetchPrices;
