import DatesList from './datesList/DatesList';
import { Position, Toaster, } from '@blueprintjs/core/lib/esm';
import ContextProviders from '../../infrastructure/services/contextProviders/ContextProviders';

export const AppToaster = Toaster.create( {
	position: Position.BOTTOM_RIGHT,
} );

const EventEditor = ( { eventId } ) => (
	<ContextProviders>
		<DatesList eventId={ eventId } />
	</ContextProviders>
);

export default EventEditor;
