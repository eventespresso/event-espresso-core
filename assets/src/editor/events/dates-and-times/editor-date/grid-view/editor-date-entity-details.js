/**
 * External imports
 */
import { ifValidDateEntity } from '@eventespresso/editor-hocs';

/**
 * Internal dependencies
 */
import EventDateDetailsPanel from './event-date-details-panel';
import InlineEditEventDateName from './inline-edit-event-date-name';
import InlineEditEventDateDescription from './inline-edit-event-date-description';
import EventDateVenueEditLink from '../event-date-venue-edit-link';

const EditorDateEntityDetails = ( {
	dateEntity,
	showDesc = 'excerpt',
	showVenue = true,
} ) => {
	return (
		<div className={ 'ee-editor-date-details-wrapper-div' }>
			<InlineEditEventDateName eventDate={ dateEntity } />
			<InlineEditEventDateDescription
				eventDate={ dateEntity }
				showDesc={ showDesc }
			/>
			<EventDateVenueEditLink
				eventDate={ dateEntity }
				showVenue={ showVenue }
			/>
			<EventDateDetailsPanel eventDate={ dateEntity } />
		</div>
	);
};

export default ifValidDateEntity( EditorDateEntityDetails );
