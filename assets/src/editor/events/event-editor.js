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

/**
 * @param {number} eventId
 * @param {Object} eventData
 * @return {Object} rendered event dates metabox
 */
const EventEditor = ( { eventId, eventData } ) => {
	useEditorPersistence( eventId );
	const {
		initialized,
		eventLoaded,
		eventDatesLoaded,
		ticketsLoaded,
		venueLoaded,
	} = useEditorInitialization( eventData );
	return (
		<>
			<FormPlaceholder
				loading={ ! initialized }
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
				loading={ ! initialized }
				id={ `ee-editor-event-dates-and-tickets-${ eventId }` }
				htmlClass="ee-editor-event-dates-and-tickets"
			>
				<EventDatesMetabox
					eventId={ eventId }
					eventDatesLoaded={ initialized }
					venueLoaded={ initialized }
				/>
				<TicketsMetabox
					eventId={ eventId }
					ticketsLoaded={ initialized }
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

