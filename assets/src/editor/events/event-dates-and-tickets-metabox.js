/**
 * External dependencies
 */
import { Component } from 'react';
import PropTypes from 'prop-types';
import { concat, differenceWith, isEqual } from 'lodash';
import { Dashicon, Panel, PanelBody, PanelRow } from '@wordpress/components';
import { __ } from '@eventespresso/i18n';
import { filterStateHandler } from '@eventespresso/higher-order-components';
import { EspressoIcon } from '@eventespresso/components';

/**
 * Internal imports
 */
import '../editor.css';
import {
	default as EditorDatesList,
} from './dates-and-times/editor-date/editor-dates-list';
import {
	default as datesListFilterState,
} from './dates-and-times/editor-date/filter-bar/dates-list-filter-state';
import {
	getFilteredDatesList,
} from './dates-and-times/editor-date/filter-bar/with-dates-list-filter-bar';
import {
	default as EditorTicketsList,
} from './tickets/editor-ticket/editor-tickets-list';
import {
	default as ticketsListFilterState,
} from './tickets/editor-ticket/filter-bar/tickets-list-filter-state';
import {
	getFilteredTicketsList,
} from './tickets/editor-ticket/filter-bar/with-tickets-list-filter-bar';

/**
 * EventDatesAndTicketsMetabox
 *
 * @constructor
 */
class EventDatesAndTicketsMetabox extends Component {
	static propTypes = {
		eventId: PropTypes.oneOfType( [
			PropTypes.number,
			PropTypes.string,
		] ).isRequired,
		eventDates: PropTypes.arrayOf( PropTypes.object ).isRequired,
	};

	constructor( props ) {
		super( props );
		this.state = this.getFilterState( this.props.eventDates );
	}

	componentDidMount() {
		filterStateHandler.addListener( this.hasUpdates );
	}

	componentWillUnmount() {
		filterStateHandler.removeListener( this.hasUpdates );
	}

	/**
	 * @param {Object} newState
	 */
	hasUpdates = ( newState ) => {
		if ( this.state !== newState ) {
			this.setState( newState );
		}
	};

	/**
	 * @param {Array} entities
	 * @return {Object} filter state object
	 */
	getFilterState = ( entities ) => {
		// merge initial filter bar state objects with entities
		let state = {
			...datesListFilterState.initialState,
			...ticketsListFilterState.initialState,
			...{ entities: entities },
		};
		// state with added actions for dates list filters
		state = filterStateHandler.register(
			datesListFilterState.handler,
			state
		);
		// state with added actions for tickets list filters
		return filterStateHandler.register(
			ticketsListFilterState.handler,
			// merge initial filter bar state object with entities
			state
		);
	};

	/**
	 * @function
	 * @param {Array} eventDates
	 * @return {Array} tickets
	 */
	getEventDateTickets = ( eventDates ) => {
		let tickets = [];
		eventDates.map(
			( eventDate ) => {
				tickets = differenceWith(
					tickets,
					eventDate.tickets,
					isEqual
				);
				tickets = concat( tickets, eventDate.tickets );
			}
		);
		return tickets;
	};

	/**
	 * @function
	 */
	updateDatesAndTickets = () => {
		this.forceUpdate();
	};

	render() {
		const { eventId } = this.props;
		const {
			entities,
			...otherProps
		} = this.state;
		const datetimes = getFilteredDatesList(
			entities,
			this.state.showDates,
			this.state.sortDates
		);
		const allTickets = this.getEventDateTickets( entities );
		const filteredTickets = getFilteredTicketsList(
			allTickets,
			this.state.showTickets,
			this.state.sortTickets
		);
		const tickets = getFilteredTicketsList(
			this.getEventDateTickets( datetimes ),
			this.state.showTickets,
			this.state.sortTickets
		);
		// console.log( '' );
		// console.log( 'EventDatesAndTicketsMetabox.render()' );
		// console.log( ' > this.state:', this.state );
		// console.log( ' > this.props:', this.props );
		// console.log( ' > otherProps:', otherProps );
		// console.log( ' # datetimes:', datetimes.length );
		// console.log( ' # tickets:', tickets.length );
		return (
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
						<PanelRow className="ee-editor-event-dates ee-form-row">
							<div>
								<EditorDatesList
									entities={ datetimes }
									allTickets={ allTickets }
									onUpdate={ this.updateDatesAndTickets }
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
						<PanelRow className="ee-editor-event-tickets ee-form-row">
							<div>
								<EditorTicketsList
									entities={ tickets }
									allDates={ entities }
									allTickets={ filteredTickets }
									isChained={ this.state.isChained }
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
		);
	}
}

export default EventDatesAndTicketsMetabox;
