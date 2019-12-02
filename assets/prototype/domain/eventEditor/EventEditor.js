import useInitQueries from '../eventEditor/containers/queries/useInitQueries';
import useFetchPrices from '../eventEditor/containers/queries/useFetchPrices';
import useFetchPriceTypes from '../eventEditor/containers/queries/useFetchPriceTypes';
import DatesList from './datesList/DatesList';
import TicketsList from './ticketsList/TicketsList';

const EventEditor = ({ eventId }) => {
	const { datetimes, datetimeError, loadingDates, tickets, ticketError, loadingTickets } = useInitQueries({
		eventId,
	});

	useFetchPriceTypes();

	const ticketIn = tickets.map(({ id }) => id);
	useFetchPrices({ ticketIn });

	return (
		<>
			<DatesList
				datetimes={datetimes}
				eventId={eventId}
				loading={loadingDates}
				error={datetimeError}
				tickets={tickets}
			/>
			<TicketsList
				tickets={tickets}
				datetimes={datetimes}
				loading={loadingTickets}
				loadingDates={loadingDates}
				error={ticketError}
			/>
		</>
	);
};

export default EventEditor;
