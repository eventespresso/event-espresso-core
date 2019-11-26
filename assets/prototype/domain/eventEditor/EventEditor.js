import useInitQueries from '../eventEditor/containers/queries/useInitQueries';
import DatesList from './datesList/DatesList';
import TicketsList from './ticketsList/TicketsList';

const EventEditor = ({ eventId }) => {
	const {
		datetimes,
		datetimeError,
		loadingDates,
		tickets,
		ticketError,
		loadingTickets
	} = useInitQueries({ eventId });
	return (
		<>
			<DatesList
				datetimes={datetimes}
				eventId={eventId}
				loading={loadingDates}
				error={datetimeError}
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
