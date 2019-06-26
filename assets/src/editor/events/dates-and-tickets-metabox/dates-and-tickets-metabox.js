/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { Fragment } from '@wordpress/element';
import {
	Dashicon,
	Panel,
	PanelBody,
	PanelRow,
} from '@wordpress/components';
import { __, _x, sprintf } from '@eventespresso/i18n';
import {
	EspressoIcon,
	FormContainer,
	FormPlaceholder,
} from '@eventespresso/components';

/**
 * Internal imports
 */
import '../../editor.css';
import { EditorDateEntitiesList } from '../dates-and-times';
import { EditorTicketEntitiesList } from '../tickets';
import withEditorInitialization, { useEditorInitialized } from '../initialization';

const MetaBox = ( { eventId, entityListView, entityListPerPage } ) => {
	const initialized = useEditorInitialized();
	return (
		<Fragment>
			<FormPlaceholder
				loading={ false }
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
				loading={ false }
				id={ `ee-editor-event-dates-and-tickets-${ eventId }` }
				htmlClass="ee-editor-event-dates-and-tickets"
			>
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
									loading={ ! initialized }
									for="event-dates-metabox"
									datesView={ entityListView }
									datesPerPage={ entityListPerPage }
								/>
							</div>
						</PanelRow>
					</PanelBody>
				</Panel>
				<br />
				<h1 className="ee-metabox-heading">
					<Dashicon icon="tickets-alt" />
					{ __( 'Available Tickets', 'event_espresso' ) }
				</h1>
				<Panel>
					<PanelBody
						id={ `ee-editor-event-tickets-${ eventId }` }
						className="ee-editor-event-tickets espresso-editor"
					>
						<PanelRow
							className="ee-editor-event-tickets ee-form-row">
							<div>
								<EditorTicketEntitiesList
									loading={ ! initialized }
									for="event-tickets-metabox"
									ticketsView={ entityListView }
									ticketsPerPage={ entityListPerPage }
								/>
							</div>
						</PanelRow>
					</PanelBody>
				</Panel>
				<br />
			</FormContainer>
		</Fragment>
	);
};

const DatesAndTicketsMetabox = withEditorInitialization( MetaBox );

MetaBox.propTypes = {
	eventId: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ).isRequired,
};

export default DatesAndTicketsMetabox;
