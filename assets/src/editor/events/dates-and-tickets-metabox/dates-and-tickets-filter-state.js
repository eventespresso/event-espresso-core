/**
 * External dependencies
 */
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
import withTicketsListFilterState from
	'../tickets/editor-ticket/filter-bar/with-tickets-list-filter-state';
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
 * @param {boolean} loadingEventDateEntities
 * @param {boolean} loadingTicketEntities
 * @param {Array} filteredEventDateEntities
 * @param {Array} allEventDateEntities
 * @param {Array} ticketEntities
 * @param {Array} allTicketEntities
 * @param {string} showDates
 * @param {string} datesSortedBy
 * @param {string} showTickets
 * @param {string} ticketsSortedBy
 * @param {boolean} isChained
 * @param {Function} render callback for rendering the metabox
 * @param {Object} otherProps
 * @return {Object} rendered DatesAndTicketsMetabox
 */
const DatesAndTicketsFilterState = ( {
	loading = true,
	loadingEventDateEntities = true,
	loadingTicketEntities = true,
	filteredEventDateEntities = EMPTY_ARRAY,
	allEventDateEntities = EMPTY_ARRAY,
	filteredTicketEntities = EMPTY_ARRAY,
	allTicketEntities = EMPTY_ARRAY,
	showDates,
	datesSortedBy,
	showTickets,
	ticketsSortedBy,
	isChained,
	render,
	...otherProps
} ) => {
	return render( {
		loading,
		loadingEventDateEntities,
		loadingTicketEntities,
		filteredEventDateEntities,
		allEventDateEntities,
		filteredTicketEntities,
		allTicketEntities,
		showDates,
		datesSortedBy,
		showTickets,
		ticketsSortedBy,
		isChained,
		...otherProps,
	} );
};

export default compose( [
	withEvent,
	withEventDatetimes,
	withTicketsForAllEventDates,
	withGetRelatedTicketsForEventDates,
	withDatesListFilterState,
	withTicketsListFilterState,
	withSelect( ( select, ownProps ) => {
		const {
			eventEntity,
			eventLoaded,
			eventDateEntities,
			eventDateEntitiesLoaded,
			eventTicketEntities,
			eventTicketEntitiesLoaded,
			showDates,
			datesSortedBy,
			showTickets,
			ticketsSortedBy,
			eventDateTicketEntities,
			isChained,
		} = ownProps;
		if ( ! eventLoaded || ! eventDateEntitiesLoaded ) {
			return {
				eventEntity,
				filteredEventDateEntities: EMPTY_ARRAY,
				allEventDateEntities: EMPTY_ARRAY,
				filteredTicketEntities: EMPTY_ARRAY,
				allTicketEntities: EMPTY_ARRAY,
				loading: ! eventLoaded,
				loadingEventDateEntities: ! eventDateEntitiesLoaded,
				loadingTicketEntities: true,
			};
		}
		// apply filter bar filters
		const filteredEventDateEntities = getFilteredDatesList(
			eventDateEntities,
			showDates,
			datesSortedBy
		);
		let filteredTicketEntities = EMPTY_ARRAY;
		if ( eventTicketEntitiesLoaded ) {
			// show filteredTicketEntities for ALL dates or for filtered subset from above?
			filteredTicketEntities = isChained ?
				eventDateTicketEntities :
				eventTicketEntities;
			// apply filter bar filters
			filteredTicketEntities = getFilteredTicketsList(
				filteredTicketEntities,
				showTickets,
				ticketsSortedBy
			);
		}
		return {
			eventEntity,
			filteredEventDateEntities,
			allEventDateEntities: filteredEventDateEntities,
			filteredTicketEntities,
			allTicketEntities: eventTicketEntities,
			loading: ! eventLoaded,
			loadingEventDateEntities: ! eventDateEntitiesLoaded,
			loadingTicketEntities: ! eventTicketEntitiesLoaded,
		};
	} ),
] )( DatesAndTicketsFilterState );
