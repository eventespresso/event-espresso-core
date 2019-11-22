import ContextProviders from '../../infrastructure/services/contextProviders/ContextProviders';
import { Position, Toaster } from '@blueprintjs/core/lib/esm';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/get';
import { GET_DATETIMES } from '../eventEditor/containers/queries/dates';
import DatesList from './datesList/DatesList';
import TicketsList from './ticketsList/TicketsList';

export const AppToaster = Toaster.create({
	position: Position.BOTTOM_RIGHT
});

const EventEditorData = ({ children, eventId }) => {
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

	return children({ loading, error, datetimes });
};

const EventEditor = ({ eventId }) => {
	return (
		<ContextProviders>
			<EventEditorData eventId={eventId}>
				{({ loading, error, datetimes }) => (
					<>
						<DatesList
							datetimes={datetimes}
							error={error}
							eventId={eventId}
							loading={loading}
						/>
						<TicketsList eventId={eventId} />
					</>
				)}
			</EventEditorData>
		</ContextProviders>
	);
};

export default EventEditor;
