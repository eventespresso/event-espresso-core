/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { Component, Fragment } from '@wordpress/element';
import { Dashicon, Panel, PanelBody, PanelRow } from '@wordpress/components';
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
import {
	default as EditorDatesList,
} from '../dates-and-times/editor-date/editor-dates-list';
import {
	default as EditorTicketsList,
} from '../tickets/editor-ticket/editor-tickets-list';
import {
	default as DatesAndTicketsFilterState,
} from './dates-and-tickets-filter-state';

/**
 * DatesAndTicketsMetabox
 * displays the Event Dates and Available Tickets "metaboxes"
 *
 * @constructor
 */
class DatesAndTicketsMetabox extends Component {
	static propTypes = {
		eventId: PropTypes.oneOfType( [
			PropTypes.number,
			PropTypes.string,
		] ).isRequired,
	};

	render() {
		const { eventId } = this.props;
		// console.log( '' );
		// console.log( 'DatesAndTicketsMetabox.render()' );
		// console.log( ' > this.props:', this.props );
		return (
			<DatesAndTicketsFilterState
				eventId={ eventId }
				render={ ( {
					loading,
					datetimes,
					allDates,
					tickets,
					allTickets,
					filteredTickets,
					isChained,
					updateDatesAndTickets,
					...otherProps
				} ) => {
					return (
						<Fragment>
							<FormPlaceholder
								loading={ loading }
								notice={
									sprintf(
										_x(
											'loading event dates and available tickets%s',
											'loading event dates and available tickets...',
											'event_espresso'
										),
										String.fromCharCode( '8230' )
									)
								}
							/>
							<FormContainer loading={ loading }>
								<div
									id={ `ee-editor-event-dates-and-tickets-${ eventId }` }
									className="ee-editor-event-dates-and-tickets"
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
														entities={ datetimes }
														allTickets={ allTickets }
														onUpdate={ updateDatesAndTickets }
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
														entities={ tickets }
														allDates={ allDates }
														allTickets={ filteredTickets }
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
								</div>
							</FormContainer>
						</Fragment>
					);
				} }
			/>
		);
	}
}

export default DatesAndTicketsMetabox;
