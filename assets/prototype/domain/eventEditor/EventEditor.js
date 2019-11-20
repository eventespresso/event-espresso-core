import ContextProviders from '../../infrastructure/services/contextProviders/ContextProviders';
import { DatesListData } from './containers/datesListData/index';
import DatesList from './DatesList';

const EventEditor = ( { eventId } ) => (
	<ContextProviders>
		<DatesListData eventId={ eventId }>
			<DatesList />
		</DatesListData>
	</ContextProviders>
);

export default EventEditor;
