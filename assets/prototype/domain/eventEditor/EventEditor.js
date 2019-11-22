import { Position, Toaster } from '@blueprintjs/core/lib/esm';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/get';
import { GET_DATETIMES } from '../eventEditor/containers/queries/dates';
import DatesList from './datesList/DatesList';
import TicketsList from './ticketsList/TicketsList';

export const AppToaster = Toaster.create({
	position: Position.BOTTOM_RIGHT
});

const EventEditor = ({ eventId }) => {
	const { loading, error, data } = useQuery(GET_DATETIMES, {
		variables: {
			where: {
				eventId
			}
		}
	});
	console.log('%c EventEditor', 'color: #1BE7FF;');
	console.log('%c > data:', 'color: #99c043;', data);

	const datetimes = get(data, ['datetimes', 'nodes']);

	return (
		<>
			<DatesList
				datetimes={datetimes}
				error={error}
				eventId={eventId}
				loading={loading}
			/>
			<TicketsList eventId={eventId} />
		</>
	);
};

export default EventEditor;
