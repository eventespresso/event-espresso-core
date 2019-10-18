/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import {
	Panel,
	PanelBody,
	PanelRow,
} from '@wordpress/components';
import {
	EspressoIcon,
} from '@eventespresso/components';
import { __, } from '@eventespresso/i18n';

/**
 * Internal imports
 */
import '../../editor.css';
import { EditorDateEntitiesList } from '../dates-and-times';

const EventDatesMetabox = ( {
	eventId,
	eventDates,
	eventDatesLoaded,
	venue,
	venueLoaded,
} ) => {
	return (
		<>
			<h1 className="ee-metabox-heading">
				<EspressoIcon icon="calendar" />
				{ __( 'Event Dates', 'event_espresso' ) }
			</h1>
			<Panel>
				<PanelBody
					id={ `ee-editor-event-dates-${ eventId }` }
					className="ee-editor-event-dates espresso-editor"
				>
					<PanelRow
						className="ee-editor-event-dates ee-form-row">
						<div>
							<EditorDateEntitiesList
								for={ 'event-dates-metabox' }
								eventDates={ eventDates }
								eventDatesLoaded={ eventDatesLoaded }
							/>
						</div>
					</PanelRow>
				</PanelBody>
			</Panel>
			<br />
		</>
	);
};

EventDatesMetabox.propTypes = {
	eventId: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ).isRequired,
	eventDates: PropTypes.array,
	eventDatesLoaded: PropTypes.bool
};

export default EventDatesMetabox;
