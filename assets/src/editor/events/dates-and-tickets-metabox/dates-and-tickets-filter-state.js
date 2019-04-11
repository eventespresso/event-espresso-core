/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { uniq } from 'lodash';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
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
	condenseArray,
	getDatetimeEntityIds,
} from './dates-and-tickets-filter-state-utils';

/**
 * DatesAndTicketsFilterState
 * manages state for the Event Dates and Available Tickets "metaboxes"
 *
 * @param {boolean} loading
 * @param {boolean} loadingDates
 * @param {boolean} loadingTickets
 * @param {Array} eventDates
 * @param {Array} eventDateTickets
 * @param {Function} getRelatedTickets
 * @param {string} showDates
 * @param {string} sortDates
 * @param {string} showTickets
 * @param {string} sortTickets
 * @param {boolean} isChained
 * @param {Function} render callback for rendering the metabox
 * @param {Object} otherProps
 * @return {Object} rendered DatesAndTicketsMetabox
 */
const DatesAndTicketsFilterState = ( {
	loading,
	loadingDates,
	loadingTickets,
	eventDates,
	eventDateTickets,
	getRelatedTickets,
	showDates,
	sortDates,
	showTickets,
	sortTickets,
	isChained,
	render,
	...otherProps
} ) => {
	const datetimes = getFilteredDatesList(
		eventDates,
		showDates,
		sortDates
	);
	const tickets = getFilteredTicketsList(
		isChained ?
			getRelatedTickets( datetimes ) :
			eventDateTickets,
		showTickets,
		sortTickets
	);
	return render( {
		loading: loading,
		loadingDates: loadingDates,
		loadingTickets: loadingTickets,
		datetimes: datetimes,
		allDates: eventDates,
		tickets: tickets,
		allTickets: eventDateTickets,
		showDates: showDates,
		sortDates: sortDates,
		showTickets: showTickets,
		sortTickets: sortTickets,
		isChained: isChained,
		getRelatedTickets: getRelatedTickets,
		...otherProps,
	} );
};

DatesAndTicketsFilterState.propTypes = {
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

export default compose( [
	withDatesListFilterState,
	withTicketsListFilterState,
	withSelect( ( select, ownProps ) => {
		let loading = true;
		let eventDates = [];
		let eventDateTickets = [];
		let dateRelationsResolved = false;
		let ticketRelationsResolved = false;
		const {
			getEventById,
			getRelatedEntities,
			getRelatedEntitiesForIds,
		} = select( 'eventespresso/core' );
		const { hasFinishedResolution } = select( 'core/data' );
		const event = getEventById( ownProps.eventId );
		if ( isModelEntityOfModel( event, 'event' ) ) {
			loading = false;
			eventDates = getRelatedEntities( event, 'datetimes' );
			eventDates = condenseArray( eventDates );
			dateRelationsResolved = hasFinishedResolution(
				'eventespresso/core',
				'getRelatedEntities',
				[ event, 'datetimes' ]
			);
			if ( dateRelationsResolved ) {
				const eventDateIds = getDatetimeEntityIds( eventDates );
				eventDateTickets = getRelatedEntitiesForIds(
					'datetime',
					eventDateIds,
					'ticket'
				);
				ticketRelationsResolved = hasFinishedResolution(
					'eventespresso/core',
					'getRelatedEntitiesForIds',
					[ 'datetime', eventDateIds, 'ticket' ]
				);
			}
		}
		/**
		 * @function
		 * @param {Array} dates
		 * @return {Array} tickets
		 */
		const getRelatedTickets = ( dates ) => {
			if ( ! ticketRelationsResolved ) {
				return null;
			}
			let tickets = [];
			dates.forEach( ( date ) => {
				tickets = tickets.concat( getRelatedEntities( date, 'ticket' ) );
			} );
			return uniq( tickets );
		};
		return {
			event,
			eventDates,
			eventDateTickets,
			getRelatedTickets,
			loading: loading,
			loadingDates: ! dateRelationsResolved,
			loadingTickets: ! ticketRelationsResolved,
		};
	} ),
] )( DatesAndTicketsFilterState );
