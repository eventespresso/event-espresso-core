/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { isEmpty, uniq } from 'lodash';
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
	datetimes,
	allDates,
	tickets,
	allTickets,
	showDates,
	sortDates,
	showTickets,
	sortTickets,
	isChained,
	render,
	...otherProps
} ) => {
	return render( {
		loading,
		loadingDates,
		loadingTickets,
		datetimes,
		allDates,
		tickets,
		allTickets,
		showDates,
		sortDates,
		showTickets,
		sortTickets,
		isChained,
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
					'tickets'
				);
				ticketRelationsResolved = hasFinishedResolution(
					'eventespresso/core',
					'getRelatedEntitiesForIds',
					[ 'datetime', eventDateIds, 'tickets' ]
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
				const relatedTickets = getRelatedEntities( date, 'tickets' );
				if (
					Array.isArray( relatedTickets ) &&
					! isEmpty( relatedTickets )
				) {
					tickets = tickets.concat( relatedTickets );
				}
			} );
			return uniq( tickets );
		};
		const datetimes = getFilteredDatesList(
			eventDates,
			ownProps.showDates,
			ownProps.sortDates
		);
		let tickets = ownProps.isChained ?
			getRelatedTickets( datetimes ) :
			eventDateTickets;
		tickets = getFilteredTicketsList(
			tickets,
			ownProps.showTickets,
			ownProps.sortTickets
		);
		return {
			event,
			datetimes,
			allDates: eventDates,
			tickets,
			allTickets: eventDateTickets,
			loading,
			loadingDates: ! dateRelationsResolved,
			loadingTickets: ! ticketRelationsResolved,
		};
	} ),
] )( DatesAndTicketsFilterState );
