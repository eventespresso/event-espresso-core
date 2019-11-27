import get from 'lodash/get';
import { useEffect, useState } from '@wordpress/element';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { GET_DATETIMES } from './dates';
import { GET_TICKETS } from './tickets';
import useToaster from '../../../../infrastructure/services/toaster/useToaster';

const useInitQueries = ({ eventId }) => {
	console.log('%c useInitQueries: ', 'color: deeppink; font-size: 14px;');
	const [initialized, setInitialized] = useState(false);
	const toaster = useToaster();
	const toasterDatesMessage = 'initializing event editor datetimes';
	const { data: datetimesData, error: datetimeError, loading: loadingDates } = useQuery(GET_DATETIMES, {
		variables: {
			first: 50,
			where: {
				eventId,
			},
		},
		onCompleted: () => {
			toaster.dismiss(toasterDatesMessage);
			toaster.success(`event editor datetimes initialized`);
		},
		onError: (error) => {
			toaster.dismiss(toasterDatesMessage);
			toaster.error(error);
		},
	});

	if (!initialized) {
		toaster.loading(loadingDates, toasterDatesMessage);
		toaster.error(datetimeError);
	}

	const datetimes = get(datetimesData, ['datetimes', 'nodes']);
	const datetimeIn = datetimes ? datetimes.map(({ id }) => id) : [];

	const toasterTicketsMessage = 'initializing event editor tickets';
	const [
		fetchRelatedTickets,
		{ data: ticketsData, error: ticketError, loading: loadingTickets, called },
	] = useLazyQuery(GET_TICKETS, {
		variables: {
			first: 50,
			where: {
				datetimeIn,
			},
		},
		onCompleted: () => {
			toaster.dismiss(toasterTicketsMessage);
			toaster.success('event editor tickets initialized');
		},
		onError: (error) => {
			toaster.dismiss(toasterTicketsMessage);
			toaster.error(error);
		},
	});

	if (!initialized) {
		toaster.loading(loadingTickets, toasterTicketsMessage);
		toaster.error(ticketError);
	}

	const tickets = get(ticketsData, ['tickets', 'nodes'], []);

	// fetch tickets only when we have datetimes
	// to avoid fetching all tickets irrespective of dates
	useEffect(() => {
		if (
			!called && // Make sure the query function has not already been called.
			datetimeIn.length // Only if we have datetimes.
		) {
			fetchRelatedTickets();
		}
	}, [datetimeIn, called]);

	useEffect(() => {
		if (!initialized && !loadingDates && !loadingTickets) {
			setInitialized(true);
		}
	}, [initialized]);

	console.log('%c > datetimes, tickets, errors, & loading state', 'color: palevioletred;', {
		datetimes: datetimes || [],
		datetimeError: datetimeError || null,
		loadingDates: loadingDates || false,
		tickets: tickets || [],
		ticketError: ticketError || null,
		loadingTickets: loadingTickets || false,
	});

	return {
		datetimes: datetimes || [],
		datetimeError: datetimeError || null,
		loadingDates: loadingDates || false,
		tickets: tickets || [],
		ticketError: ticketError || null,
		loadingTickets: loadingTickets || false,
	};
};

export default useInitQueries;
