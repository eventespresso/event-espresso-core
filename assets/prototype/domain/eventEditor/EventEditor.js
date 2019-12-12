import useInitQueries from '../eventEditor/containers/queries/useInitQueries';
import DateList from './datetimes/dateList/DateList';
import TicketList from './tickets/ticketList/TicketList';

const EventEditor = () => {
	const { datetimes, datetimeError, loadingDates, tickets, ticketError, loadingTickets } = useInitQueries();

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
