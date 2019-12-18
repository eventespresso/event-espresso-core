import { useQuery } from '@apollo/react-hooks';
import { useEffect, useState } from '@wordpress/element';
import { GET_TICKETS } from './';
import useToaster from '../../../../../application/services/toaster/useToaster';
import useStatus from '../../../../../application/services/apollo/status/useStatus';
import useTicketQueryOptions from './useTicketQueryOptions';
import useDatetimeIds from '../datetimes/useDatetimeIds';

const useFetchTickets = () => {
	console.log('%c useFetchTickets: ', 'color: deeppink; font-size: 14px;');
	const [initialized, setInitialized] = useState(false);
	const { setIsLoading, setIsLoaded, setIsError } = useStatus();
	const options = useTicketQueryOptions();
	const datetimeIn = useDatetimeIds();

	const toaster = useToaster();
	const toasterMessage = 'initializing tickets';

	const { data, error, loading } = useQuery(GET_TICKETS, {
		...options,
		skip: !datetimeIn.length, // do not fetch if we don't have any datetimes
		onCompleted: () => {
			setIsLoaded('tickets', true);
			toaster.dismiss(toasterMessage);
			toaster.success(`tickets initialized`);
		},
		onError: (error) => {
			setIsError('tickets', true);
			toaster.dismiss(toasterMessage);
			toaster.error(error);
		},
	});

	useEffect(() => {
		setIsLoading('tickets', loading);
	}, [loading]);

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
