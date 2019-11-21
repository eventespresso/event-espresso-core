import { Position, Toaster, } from '@blueprintjs/core/lib/esm';
import ContextProviders from '../../infrastructure/services/contextProviders/ContextProviders';
import DatesList from './datesList/DatesList';
import TicketsList from './ticketsList/TicketsList';

export const AppToaster = Toaster.create( {
	position: Position.BOTTOM_RIGHT,
} );

const EventEditor = ( { eventId } ) => (
	<ContextProviders>
		<DatesList eventId={ eventId } />
		<TicketsList eventId={ eventId } />
	</ContextProviders>
);

export default EventEditor;
