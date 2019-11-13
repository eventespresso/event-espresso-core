/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import {
	Panel,
	PanelBody,
	PanelRow,
} from '@wordpress/components';
import { EspressoIcon } from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';

/**
 * Internal imports
 */
import '../../editor.css';
import { EditorDateEntitiesList } from '../dates-and-times';

/**
 * EventDatesMetabox
 *
 * displays a "metabox" for managing an event's datetimes
 *
 * @param {boolean} eventDatesLoaded
 * @param {boolean} venueLoaded
 * @param {number} eventId
 * @return {Object} rendered event dates metabox
 */
const EventDatesMetabox = ( {
	eventId,
	eventDatesLoaded,
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
								eventDatesLoaded={ eventDatesLoaded }
								venueLoaded={ venueLoaded }
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
};

export default EventDatesMetabox;
