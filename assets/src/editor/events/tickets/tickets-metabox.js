/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import {
	Dashicon,
	Panel,
	PanelBody,
	PanelRow,
} from '@wordpress/components';
import { __, } from '@eventespresso/i18n';

/**
 * Internal imports
 */
import '../../editor.css';
import { EditorTicketEntitiesList } from '../tickets';

/**
 * TicketsMetabox
 *
 * displays a "metabox" for managing an event's tickets
 *
 * @param {number} eventId
 * @return {Object} rendered event dates metabox
 */
const TicketsMetabox = ( { eventId } ) => {
	return (
		<>
		<h1 className="ee-metabox-heading">
			<Dashicon icon="tickets-alt" />
			{ __( 'Available Tickets', 'event_espresso' ) }
		</h1>
		<Panel>
			<PanelBody
				id={ `ee-editor-event-tickets-${ eventId }` }
				className="ee-editor-event-tickets espresso-editor"
			>
				<PanelRow className="ee-editor-event-tickets ee-form-row">
					<div>
						<EditorTicketEntitiesList
							for={ 'event-tickets-metabox' }
						/>
					</div>
				</PanelRow>
			</PanelBody>
		</Panel>
		<br />
		</>
	);
};

TicketsMetabox.propTypes = {
	eventId: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ).isRequired,
};

export default TicketsMetabox;
