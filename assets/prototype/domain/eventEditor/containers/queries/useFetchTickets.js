import { useQuery } from '@apollo/react-hooks';
import { useEffect, useState } from '@wordpress/element';
import { GET_TICKETS } from './tickets';
import useToaster from '../../../../infrastructure/services/toaster/useToaster';
import useStatus from '../../../../infrastructure/services/status/useStatus';

const useFetchTickets = ({ datetimeIn = [] }) => {
	console.log('%c useFetchTickets: ', 'color: deeppink; font-size: 14px;');
	const [initialized, setInitialized] = useState(false);
	const { setIsLoading, setIsLoaded, setIsError } = useStatus();

	const toaster = useToaster();
	const toasterMessage = 'initializing tickets';

	const { data, error, loading } = useQuery(GET_TICKETS, {
		variables: {
			where: {
				datetimeIn,
			},
		},
		skip: !datetimeIn.length, // do not fetch if we don't have any datetimes
		onCompleted: () => {
			toaster.dismiss(toasterMessage);
			toaster.success(`tickets initialized`);
		},
		onError: (error) => {
			toaster.dismiss(toasterMessage);
			toaster.error(error);
		},
	});

	useEffect(() => {
		setIsLoading('tickets', loading);
		setIsLoaded('tickets', !!data);
		setIsError('tickets', !!error);
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

export default useFetchTickets;
