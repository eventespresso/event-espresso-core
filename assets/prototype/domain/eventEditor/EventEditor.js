import useCacheRehydration from './containers/queries/useCacheRehydration';
import useDatetimes from './containers/queries/useDatetimes';
import useTickets from './containers/queries/useTickets';
import DateList from './datetimes/dateList/DateList';
import TicketList from './tickets/ticketList/TicketList';

const EventEditor = () => {
	const { datetimeError, loadingDates, ticketError, loadingTickets } = {};
	useCacheRehydration();

	const datetimes = useDatetimes();
	const tickets = useTickets();

	return (
		<>
			<DateList datetimes={datetimes} loading={loadingDates} error={datetimeError} tickets={tickets} />
			<TicketList
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
