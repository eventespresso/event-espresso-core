import { Position, Toaster } from '@blueprintjs/core/lib/esm';
import useInitQueries from '../eventEditor/containers/queries/useInitQueries';
import DatesList from './datesList/DatesList';
import TicketsList from './ticketsList/TicketsList';

export const AppToaster = Toaster.create({
	position: Position.BOTTOM_RIGHT
});

const EventEditor = ({ eventId }) => {
	const { datetimes, tickets } = useInitQueries({ eventId });

	return (
		<>
			<DatesList datetimes={datetimes} eventId={eventId} />
			<TicketsList eventId={eventId} tickets={tickets} />
		</>
	);
};

export default EventEditor;
