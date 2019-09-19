/**
 * External imports
 */
import { ifValidDateEntity } from '@eventespresso/editor-hocs';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import EventDateDetailsPanel from './event-date-details-panel';
import InlineEditEventDateName from './inline-edit-event-date-name';
import InlineEditEventDateDescription from './inline-edit-event-date-description';
import EventDateVenueEditLink from '../event-date-venue-edit-link';

const EditorDateEntityDetails = ( {
	dateEntity,
	showDesc,
	showVenue,
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

EditorDateEntityDetails.propTypes = {
	dateEntity: PropTypes.object.isRequired,
	showDesc: PropTypes.string,
	showVenue: PropTypes.bool,
};

EditorDateEntityDetails.defaultProps = {
	showDesc: 'excerpt',
	showVenue: true,
};

export default ifValidDateEntity( EditorDateEntityDetails );
