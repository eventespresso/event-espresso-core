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
import EditorDatesList from '../dates-and-times/editor-date/editor-dates-list';
import EditorTicketsList from '../tickets/editor-ticket/editor-tickets-list';
import DatesAndTicketsFilterState from './dates-and-tickets-filter-state';

/**
 * DatesAndTicketsMetabox
 * displays the Event Dates and Available Tickets "metaboxes"
 *
 * @function
 * @param {number} eventId
 * @return {Component} event dates and tickets available tickets metaboxes
 */
const DatesAndTicketsMetabox = ( { eventId } ) => (
	<DatesAndTicketsFilterState
		eventId={ eventId }
		render={ ( {
			loading,
			loadingDates,
			loadingTickets,
			datetimes,
			allDates,
			tickets,
			allTickets,
			isChained,
			...otherProps
		} ) => {
			return (
				<Fragment>
					<FormPlaceholder
						loading={ loading }
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
						loading={ loading }
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
										<EditorDatesList
											loading={ loadingDates }
											entities={ datetimes }
											allDates={ allDates }
											allTickets={ allTickets }
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
										<EditorTicketsList
											loading={ loadingTickets }
											entities={ tickets }
											allDates={ allDates }
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
		} }
	/>
);

DatesAndTicketsMetabox.propTypes = {
	eventId: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ).isRequired,
};

export default DatesAndTicketsMetabox;
