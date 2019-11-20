import ContextProviders from '../../infrastructure/services/contextProviders/ContextProviders';
import DatesList from './DatesList';

const EventEditor = ( { eventId } ) => (
	<ContextProviders>
		<DatesList eventId={ eventId } />
	</ContextProviders>
);

export default EventEditor;
