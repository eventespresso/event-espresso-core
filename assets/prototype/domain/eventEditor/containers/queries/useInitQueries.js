import { pathOr } from 'ramda';
import { useQuery } from '@apollo/react-hooks';
import { GET_DATETIMES } from './dates';
import { GET_TICKETS } from './tickets';
import useToaster from '../../../../infrastructure/services/toaster/useToaster';

const useInitQueries = ({ eventId }) => {
	console.log('%c useInitQueries: ', 'color: deeppink; font-size: 14px;');
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

	const datetimes = pathOr([], ['datetimes', 'nodes'], datetimesData);
	const datetimeIn = datetimes ? datetimes.map(({ id }) => id) : [];
	const toasterTicketsMessage = 'initializing event editor tickets';
	const skipTicketsQuery = datetimeIn.length === 0;

	const { data: ticketsData, error: ticketError, loading: loadingTickets } = useQuery(GET_TICKETS, {
		variables: {
			first: 50,
			where: {
				datetimeIn,
			},
			skip: skipTicketsQuery,
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

	const tickets = pathOr([], ['tickets', 'nodes'], ticketsData);

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
