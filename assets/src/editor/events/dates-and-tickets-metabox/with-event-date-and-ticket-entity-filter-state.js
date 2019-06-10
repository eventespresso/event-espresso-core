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
	getFilteredDateEntitiesList,
} from '../dates-and-times/editor-date/filter-bar';
import {
	withTicketEntitiesListFilterState,
	getFilteredTicketEntitiesList
} from '../tickets/editor-ticket/filter-bar';
import { withEventEntity, withEventDateEntities } from '../events/data';
import { withMultipleDateTicketEntities } from '../dates-and-times/data';

const EMPTY_ARRAY = [];

const withDateAndTicketEntityFilterState = createHigherOrderComponent(
	compose( [
		withEventEntity,
		withEventDateEntities,
		withMultipleDateTicketEntities,
		withDatesListFilterState,
		withTicketEntitiesListFilterState,
		withSelect( ( select, ownProps ) => {
			const {
				eventId,
				eventEntity,
				eventLoaded,
				dateEntities,
				dateEntitiesLoaded,
				ticketEntities,
				ticketEntitiesLoaded,
				showDates,
				datesSortedBy,
				showTickets,
				ticketsSortedBy,
				dateTicketEntities,
				isChained,
			} = ownProps;
			if ( ! eventLoaded || ! dateEntitiesLoaded ) {
				return {
					eventId,
					eventEntity,
					filteredDateEntities: EMPTY_ARRAY,
					allDateEntities: EMPTY_ARRAY,
					filteredTicketEntities: EMPTY_ARRAY,
					allTicketEntities: EMPTY_ARRAY,
					loading: ! eventLoaded,
					loadingDateEntities: ! dateEntitiesLoaded,
					loadingTicketEntities: true,
					isChained,
				};
			}
			// apply filter bar filters
			const filteredDateEntities = getFilteredDateEntitiesList(
				dateEntities,
				showDates,
				datesSortedBy
			);
			let filteredTicketEntities = EMPTY_ARRAY;
			if ( ticketEntitiesLoaded ) {
				// show filteredTicketEntities for ALL dates or for filtered subset from above?
				filteredTicketEntities = isChained ?
					dateTicketEntities :
					ticketEntities;
				// apply filter bar filters
				filteredTicketEntities = getFilteredTicketEntitiesList(
					filteredTicketEntities,
					showTickets,
					ticketsSortedBy
				);
			}
			return {
				eventId,
				eventEntity,
				filteredDateEntities,
				allDateEntities: dateEntities,
				filteredTicketEntities,
				allTicketEntities: ticketEntities,
				loading: ! eventLoaded,
				loadingDateEntities: ! dateEntitiesLoaded,
				loadingTicketEntities: ! ticketEntitiesLoaded,
				isChained,
			};
		} ),
	] ),
	'withDatesAndTicketsFilterState'
);

withDateAndTicketEntityFilterState.propTypes = {
	eventId: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ).isRequired,
};

export default withDateAndTicketEntityFilterState;
