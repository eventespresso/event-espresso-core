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
import EditorDateEntitiesList
	from '../dates-and-times/editor-date/editor-date-entities-list';
import EditorTicketEntitiesList
	from '../tickets/editor-ticket/editor-ticket-entities-list';
import withEventDateAndTicketEntityFilterState
	from './with-event-date-and-ticket-entity-filter-state';

const MetaBox = ( {
	eventId,
	eventEntityLoaded,
	dateEntitiesLoaded,
	filteredDateEntities,
	allDateEntities,
	filteredTicketEntities,
	allTicketEntities,
	ticketEntitiesLoaded,
	isChained,
	...otherProps
} ) => {
	return (
		<Fragment>
			<FormPlaceholder
				loading={ ! eventEntityLoaded }
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
				loading={ ! eventEntityLoaded }
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
									loading={ ! dateEntitiesLoaded }
									entities={ filteredDateEntities }
									allDateEntities={ allDateEntities }
									allTicketEntities={ allTicketEntities }
									prefiltered
									for="event-dates-metabox"
									{ ...otherProps }
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
									loading={ ! ticketEntitiesLoaded }
									entities={ filteredTicketEntities }
									allDateEntities={ allDateEntities }
									isChained={ isChained }
									prefiltered
									for="event-tickets-metabox"
									{ ...otherProps }
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

const DatesAndTicketsMetabox = withEventDateAndTicketEntityFilterState( MetaBox );

DatesAndTicketsMetabox.propTypes = {
	eventId: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ).isRequired,
};

export default DatesAndTicketsMetabox;
