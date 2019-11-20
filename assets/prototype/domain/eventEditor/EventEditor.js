import DatesList from './datesList/DatesList';
import ContextProviders from '../../infrastructure/services/contextProviders/ContextProviders';

const EventEditor = ( { eventId } ) => (
	<ContextProviders>
		<DatesList eventId={ eventId } />
	</ContextProviders>
);

export default EventEditor;
