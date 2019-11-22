import { Position, Toaster } from '@blueprintjs/core/lib/esm';
import useInitQueries from '../eventEditor/containers/queries/useInitQueries';
import DatesList from './datesList/DatesList';
import TicketsList from './ticketsList/TicketsList';

export const AppToaster = Toaster.create({
	position: Position.BOTTOM_RIGHT
});

const EventEditor = ({ eventId }) => {
	const {
		datetimes,
		datetimeError,
		loadingDates,
		tickets,
		ticketError,
		loadingTickets
	} = useInitQueries( { eventId } );

	return (
		<>
			<DatesList
				datetimes={ datetimes }
				eventId={ eventId }
				loading={ loadingDates }
				error={ datetimeError }
			/>
			<TicketsList
				tickets={ tickets }
				datetimes={ datetimes }
				loading={ loadingTickets }
				error={ ticketError }
			/>
		</>
	);
};

export default EventEditor;
