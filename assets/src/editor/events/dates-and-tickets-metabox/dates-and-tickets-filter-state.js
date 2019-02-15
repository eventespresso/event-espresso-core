/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { Component } from '@wordpress/element';
import { isEmpty, uniq } from 'lodash';
import { withSelect } from '@wordpress/data';
import { filterStateHandler } from '@eventespresso/higher-order-components';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal imports
 */
import '../../editor.css';
import {
	default as datesListFilterState,
} from '../dates-and-times/editor-date/filter-bar/dates-list-filter-state';
import {
	getFilteredDatesList,
} from '../dates-and-times/editor-date/filter-bar/with-dates-list-filter-bar';
import {
	default as ticketsListFilterState,
} from '../tickets/editor-ticket/filter-bar/tickets-list-filter-state';
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
		eventDates: PropTypes.arrayOf( PropTypes.object ),
		eventDateTickets: PropTypes.arrayOf( PropTypes.object ),
		eventDateTicketMap: PropTypes.object,
		render: PropTypes.func,
	};

	state = { entities: [] };

	componentDidMount() {
		filterStateHandler.addListener( this.hasUpdates );
	}

	componentWillUnmount() {
		filterStateHandler.removeListener( this.hasUpdates );
	}

	/**
	 * @param {Object} prevProps
	 */
	componentDidUpdate( prevProps ) {
		if (
			! isEmpty( this.props.eventDates ) &&
			this.props.eventDates !== prevProps.eventDates
		) {
			this.setState( this.getFilterState( this.props.eventDates ) );
		}
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

	/**
	 * @function
	 */
	updateDatesAndTickets = () => {
		this.forceUpdate();
	};

	render() {
		const { render, eventDateTickets, eventDateTicketMap } = this.props;
		const {
			entities,
			isChained,
			...otherProps
		} = this.state;
		// console.log( '' );
		// console.log( 'DatesAndTicketsFilterState.render()' );
		// console.log( ' > this.props:', this.props );
		// console.log( ' > this.state:', this.state );
		let datetimes = [];
		// let allTickets = [];
		let filteredTickets = [];
		let tickets = [];

		if ( ! isEmpty( entities ) ) {
			// console.log( 'WE HAVE ENTITIES !!!' );
			// console.log( ' > > entities:', entities );
			datetimes = getFilteredDatesList(
				entities,
				this.state.showDates,
				this.state.sortDates
			);
			// console.log( ' > > datetimes:', datetimes );
			// console.log( ' > > call getEventDateTickets()' );
			// allTickets = this.getEventDateTickets( entities );
			// console.log( ' > > allTickets:', allTickets );
			filteredTickets = getFilteredTicketsList(
				eventDateTickets,
				this.state.showTickets,
				this.state.sortTickets
			);
			// console.log( ' > > filteredTickets:', filteredTickets );
			tickets = getFilteredTicketsList(
				this.getEventDateTickets( datetimes, eventDateTicketMap ),
				this.state.showTickets,
				this.state.sortTickets
			);
			// console.log( ' > > tickets:', tickets );
		}
		// console.log( ' > > eventDateTickets:', eventDateTickets );

		return render( {
			loading: isEmpty( entities ) || isEmpty( eventDateTickets ),
			datetimes: datetimes,
			allDates: entities,
			tickets: tickets,
			allTickets: eventDateTickets,
			filteredTickets: filteredTickets,
			isChained: isChained,
			updateDatesAndTickets: this.updateDatesAndTickets,
			...otherProps,
		} );
	}
}

export default withSelect( ( select, ownProps ) => {
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
			eventDateTickets = listStore.getEntities( 'ticket', ticketQueryString );
			eventDateTicketMap = buildEventDateTicketRelationsMap(
				eventDateIds,
				eventDateTickets,
				listStore.getEntities( 'datetime_ticket', queryString )
			);
		}
	}
	return { event, eventDates, eventDateTickets, eventDateTicketMap };
} )( DatesAndTicketsFilterState );
