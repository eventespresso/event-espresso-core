/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { compose, createHigherOrderComponent } from '@wordpress/compose';
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

const withEventDateAndTicketEntityFilterState = createHigherOrderComponent(
	compose( [
		withEvent,
		withEventDatetimes,
		withTicketsForAllEventDates,
		withGetRelatedTicketsForEventDates,
		withDatesListFilterState,
		withTicketsListFilterState,
		withSelect( ( select, ownProps ) => {
			const {
				eventId,
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
					eventId,
					eventEntity,
					filteredEventDateEntities: EMPTY_ARRAY,
					allEventDateEntities: EMPTY_ARRAY,
					filteredTicketEntities: EMPTY_ARRAY,
					allTicketEntities: EMPTY_ARRAY,
					loading: ! eventLoaded,
					loadingEventDateEntities: ! eventDateEntitiesLoaded,
					loadingTicketEntities: true,
					isChained,
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
				eventId,
				eventEntity,
				filteredEventDateEntities,
				allEventDateEntities: filteredEventDateEntities,
				filteredTicketEntities,
				allTicketEntities: eventTicketEntities,
				loading: ! eventLoaded,
				loadingEventDateEntities: ! eventDateEntitiesLoaded,
				loadingTicketEntities: ! eventTicketEntitiesLoaded,
				isChained,
			};
		} ),
	] ),
	'withDatesAndTicketsFilterState'
);

withEventDateAndTicketEntityFilterState.propTypes = {
	eventId: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ).isRequired,
};

export default withEventDateAndTicketEntityFilterState;
