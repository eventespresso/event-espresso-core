/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import {
	FormContainer,
	FormPlaceholder,
} from '@eventespresso/components';
import { _x, sprintf } from '@eventespresso/i18n';

/**
 * Internal imports
 */
import EventDatesMetabox from './dates-and-times/event-dates-metabox';
import TicketsMetabox from './tickets/tickets-metabox';
import useEditorInitialization
	from './initialization/use-editor-initialization.js';
import useEditorPersistence
	from './initialization/use-editor-persistence';

const EventEditor = ( { eventId, eventData } ) => {
	useEditorPersistence( eventId );
	const {
		eventDates,
		tickets,
		venue,
		eventLoaded,
		eventDatesLoaded,
		ticketsLoaded,
		venueLoaded,
	} = useEditorInitialization( eventData );

	return (
		<>
			<FormPlaceholder
				loading={ ! eventLoaded }
				notice={ sprintf(
					_x(
						'loading event dates and available tickets%s',
						'loading event dates and available tickets...',
						'event_espresso'
					),
					String.fromCharCode( 8230 )
				) }
			/>
			<FormContainer
				loading={ ! eventLoaded }
				id={ `ee-editor-event-dates-and-tickets-${ eventId }` }
				htmlClass="ee-editor-event-dates-and-tickets"
			>
				<EventDatesMetabox
					eventId={ eventId }
					eventDates={ eventDates }
					eventDatesLoaded={ eventDatesLoaded }
					venue={ venue }
					venueLoaded={ venueLoaded }
				/>
				<TicketsMetabox
					eventId={ eventId }
					tickets={ tickets }
					ticketsLoaded={ ticketsLoaded }
				/>
			</FormContainer>
		</>
	);
};

EventEditor.propTypes = {
	eventId: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ).isRequired,
	eventData: PropTypes.object,
};

export default EventEditor;

