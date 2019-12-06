import { useQuery } from '@apollo/react-hooks';
import { useEffect, useState } from '@wordpress/element';
import { GET_PRICES } from './prices';
import useInitToaster from '../../../../infrastructure/services/toaster/useInitToaster';
import useStatus from '../../../../infrastructure/services/status/useStatus';


const useFetchPrices = ({ ticketIn = [] }) => {
	console.log('%c useFetchPrices: ', 'color: deeppink; font-size: 14px;');

	const toasterMessage = 'initializing prices';

	const initToaster = useInitToaster({
		toasterMessage,
		loadingMessage: toasterMessage,
		successMessage: 'prices initialized'
	});

	const { data, error, loading } = useQuery(GET_PRICES, {
		variables: {
			where: {
				ticketIn,
			},
		},
		skip: !ticketIn.length, // do not fetch if we don't have any tickets
		...initToaster
	});

	initToaster.initializationNotices(loading, error);

	return {
		data,
		error,
		loading,
	};
};

export default useFetchPrices;
