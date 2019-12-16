import useInitQueries from './data/queries/useInitQueries';
import DateList from './datetimes/dateList/DateList';
import TicketList from './tickets/ticketList/TicketList';

const EventEditor = () => {
	useInitQueries();

	return (
		<>
			<DateList />
			<TicketList />
		</>
	);
};

export default EventEditor;
