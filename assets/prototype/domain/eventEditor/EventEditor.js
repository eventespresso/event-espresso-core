import ContextProviders from '../../infrastructure/services/contextProviders/ContextProviders';
import { DatesListData } from './containers/datesListData/index';

const EventEditor = ( { eventId } ) => {
	return (
		<ContextProviders>
			<DatesListData eventId={ eventId }>
			test
			</DatesListData>
		</ContextProviders>
	);
};

export default EventEditor;
