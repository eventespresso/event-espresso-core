/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { isEmpty, uniq } from 'lodash';
import { createHigherOrderComponent, compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { Component } from '@wordpress/element';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal imports
 */
import '../../editor.css';
import {
	default as withDatesListFilterState,
} from '../dates-and-times/editor-date/filter-bar/with-dates-list-filter-state';
import {
	getFilteredDatesList,
} from '../dates-and-times/editor-date/filter-bar/with-dates-list-filter-bar';
import {
	default as withTicketsListFilterState,
} from '../tickets/editor-ticket/filter-bar/with-tickets-list-filter-state';
import {
	getFilteredTicketsList,
} from '../tickets/editor-ticket/filter-bar/with-tickets-list-filter-bar';
import {
	buildEventDateTicketRelationsMap,
	condenseArray,
	getDatetimeEntityIds,
} from './dates-and-tickets-filter-state-utils';

/**
 * DatesAndTicketsFilterState
 * manages state for the Event Dates and Available Tickets "metaboxes"
 *
 * @constructor
 * @param {number|string} eventId
 * @param {Array} eventDates
 * @param {Array} eventDateTickets
 * @param {Object} eventDateTicketMap
 * @param {Function} render
 */
class DatesAndTicketsFilterState extends Component {
	static propTypes = {
		eventId: PropTypes.oneOfType( [
			PropTypes.number,
			PropTypes.string,
		] ).isRequired,
		event: PropTypes.object,
		eventDates: PropTypes.arrayOf( PropTypes.object ),
		eventDateTickets: PropTypes.arrayOf( PropTypes.object ),
		eventDateTicketMap: PropTypes.object,
		render: PropTypes.func,
	};

	/**
	 * @function
	 * @param {Array} eventDates
	 * @param {Array} eventDateTicketMap tickets sorted by eventDate
	 * @return {Array} tickets
	 */
	getEventDateTickets = ( eventDates, eventDateTicketMap ) => {
		let tickets = [];
		eventDates.map(
			( eventDate ) => {
				if (
					! isEmpty( eventDateTicketMap[ eventDate.id ] ) &&
					Array.isArray( eventDateTicketMap[ eventDate.id ] )
				) {
					tickets = tickets.concat(
						eventDateTicketMap[ eventDate.id ]
					);
				}
			}
		);
		return uniq( tickets );
	};

	render() {
		const {
			render,
			event,
			eventDates,
			eventDateTickets,
			eventDateTicketMap,
			showDates,
			sortDates,
			showTickets,
			sortTickets,
			isChained,
			...otherProps
		} = this.props;
		let datetimes = [];
		let tickets = [];

		if ( ! isEmpty( eventDates ) ) {
			datetimes = getFilteredDatesList(
				eventDates,
				showDates,
				sortDates
			);
			tickets = isChained ?
				this.getEventDateTickets( datetimes, eventDateTicketMap ) :
				eventDateTickets;
			tickets = getFilteredTicketsList(
				tickets,
				showTickets,
				sortTickets
			);
		}

		return render( {
			loading: isEmpty( eventDates ) || isEmpty( eventDateTickets ),
			event: event,
			datetimes: datetimes,
			allDates: eventDates,
			tickets: tickets,
			allTickets: eventDateTickets,
			showDates: showDates,
			sortDates: sortDates,
			showTickets: showTickets,
			sortTickets: sortTickets,
			isChained: isChained,
			eventDateTicketMap: eventDateTicketMap,
			...otherProps,
		} );
	}
}

export default createHigherOrderComponent(
	compose( [
		withDatesListFilterState,
		withTicketsListFilterState,
		withSelect( ( select, ownProps ) => {
			let eventDates = [];
			let eventDateTickets = [];
			let eventDateIds = [];
			let eventDateTicketMap = {};
			const coreStore = select( 'eventespresso/core' );
			const listStore = select( 'eventespresso/lists' );
			const event = coreStore.getEventById( ownProps.eventId );
			if ( isModelEntityOfModel( event, 'event' ) ) {
				eventDates = coreStore.getRelatedEntities( event, 'datetimes' );
				eventDates = condenseArray( eventDates );
				if ( ! isEmpty( eventDates ) ) {
					eventDateIds = getDatetimeEntityIds( eventDates );
					const queryString = 'where[Datetime.DTT_ID][IN]=[' +
						eventDateIds.join( ',' ) + ']';
					const ticketQueryString = queryString +
						'&default_where_conditions=minimum';
					eventDateTickets = listStore.getEntities(
						'ticket',
						ticketQueryString
					);
					eventDateTicketMap = buildEventDateTicketRelationsMap(
						eventDateIds,
						eventDateTickets,
						listStore.getEntities( 'datetime_ticket', queryString )
					);
				}
			}
			return { event, eventDates, eventDateTickets, eventDateTicketMap };
		} ),
	] ),
	'withDatesAndTicketsFilterState'
)( DatesAndTicketsFilterState );

