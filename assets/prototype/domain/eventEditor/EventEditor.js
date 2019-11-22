import { Position, Toaster, } from '@blueprintjs/core/lib/esm';
import { useQuery } from '@apollo/react-hooks';
import { GET_DATETIMES } from '../eventEditor/containers/queries/dates'
import DatesList from './datesList/DatesList';
import TicketsList from './ticketsList/TicketsList';

const { console } = window.console;

export const AppToaster = Toaster.create( {
	position: Position.BOTTOM_RIGHT,
} );



const EventEditor = ( { eventId } ) => {
	const data = useQuery( GET_DATETIMES, {
		variables: {
			where: {
				eventId
			}
		}
	} );
	console.log( '%c EventEditor', 'color: #1BE7FF;' );
	console.log( '%c > data:', 'color: #99c043;', data );
	return (
		<>
			<DatesList eventId={ eventId } { ...data } />
			<TicketsList eventId={ eventId } { ...data }/>
		</>
	);
};

export default EventEditor;
