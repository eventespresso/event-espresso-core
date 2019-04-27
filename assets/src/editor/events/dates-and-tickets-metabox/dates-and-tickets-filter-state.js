/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';

/**
 * Internal imports
 */
import '../../editor.css';
import {
	withDatesListFilterState,
	getFilteredDatesList,
} from '../dates-and-times/editor-date/filter-bar';
import {
	default as withTicketsListFilterState,
} from '../tickets/editor-ticket/filter-bar/with-tickets-list-filter-state';
import {
	getFilteredTicketsList,
} from '../tickets/editor-ticket/filter-bar/with-tickets-list-filter-bar';
import { withEvent, withEventDatetimes } from '../events/data';
import {
	withGetRelatedTicketsForEventDates,
	withTicketsForAllEventDates,
} from '../dates-and-times/data';

const EMPTY_ARRAY = [];

/**
 * DatesAndTicketsFilterState
 * manages state for the Event Dates and Available Tickets "metaboxes"
 *
 * @param {boolean} loading
 * @param {boolean} loadingDates
 * @param {boolean} loadingTickets
 * @param {Array} datetimes
 * @param {Array} allDates
 * @param {Array} tickets
 * @param {Array} allTickets
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
	loading = true,
	loadingDates = true,
	loadingTickets = true,
	datetimes = EMPTY_ARRAY,
	allDates = EMPTY_ARRAY,
	tickets = EMPTY_ARRAY,
	allTickets = EMPTY_ARRAY,
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
	withEvent,
	withEventDatetimes,
	withTicketsForAllEventDates,
	withGetRelatedTicketsForEventDates,
	withSelect( ( select, ownProps ) => {
		const {
			event,
			eventLoaded,
			eventDates,
			eventDatesLoaded,
			eventDateTickets,
			eventDateTicketsLoaded,
			showDates,
			sortDates,
			showTickets,
			sortTickets,
			getRelatedTicketsForEventDates,
		} = ownProps;
		if ( ! eventLoaded || ! eventDatesLoaded ) {
			return {
				event,
				datetimes: EMPTY_ARRAY,
				allDates: EMPTY_ARRAY,
				tickets: EMPTY_ARRAY,
				allTickets: EMPTY_ARRAY,
				loading: ! eventLoaded,
				loadingDates: ! eventDatesLoaded,
				loadingTickets: true,
			};
		}
		// apply filter bar filters
		const datetimes = getFilteredDatesList(
			eventDates,
			showDates,
			sortDates
		);
		let tickets = EMPTY_ARRAY;
		if ( eventDateTicketsLoaded ) {
			// show tickets for ALL dates or for filtered subset from above?
			tickets = ownProps.isChained ?
				getRelatedTicketsForEventDates( datetimes ) :
				eventDateTickets;
			// apply filter bar filters
			tickets = getFilteredTicketsList(
				tickets,
				showTickets,
				sortTickets
			);
		}
		return {
			event,
			datetimes,
			allDates: eventDates,
			tickets,
			allTickets: eventDateTickets,
			loading: ! eventLoaded,
			loadingDates: ! eventDatesLoaded,
			loadingTickets: ! eventDateTicketsLoaded,
		};
	} ),
] )( DatesAndTicketsFilterState );
