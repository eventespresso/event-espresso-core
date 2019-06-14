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
	withFilteredDateEntitiesList,
} from '../dates-and-times/editor-date/filter-bar';
import {
	withTicketEntitiesListFilterState,
	getFilteredTicketEntitiesList,
} from '../tickets/editor-ticket/filter-bar';
import { withEventEntity, withEventDateEntities } from '../events/data';
import { withTicketEntitiesForAllDateEntities } from '../dates-and-times/data';
import withTicketEntitiesForFilteredDateEntities
	from './with-ticket-entities-for-filtered-date-entities';

const EMPTY_ARRAY = [];

const withEventDateAndTicketEntityFilterState = createHigherOrderComponent(
	compose( [
		withEventEntity,
		withEventDateEntities,
		withTicketEntitiesForAllDateEntities,
		withDatesListFilterState,
		withTicketEntitiesListFilterState,
		withFilteredDateEntitiesList,
		withTicketEntitiesForFilteredDateEntities,
		( WrappedComponent ) => ( {
			allTicketEntities,
			ticketEntitiesLoaded,
			isChained,
			ticketEntities,
			showTickets,
			ticketsSortedBy,
			...otherProps
		} ) => {
			let filteredTicketEntities = EMPTY_ARRAY;
			if ( ticketEntitiesLoaded ) {
				// show filteredTicketEntities for ALL dates or for filtered subset from above?
				filteredTicketEntities = isChained ?
					ticketEntities :
					allTicketEntities;
				// apply filter bar filters
				filteredTicketEntities = getFilteredTicketEntitiesList(
					filteredTicketEntities,
					showTickets,
					ticketsSortedBy
				);
			}
			return <WrappedComponent
				allTicketEntities={ allTicketEntities }
				loadingTicketEntities={ ! ticketEntitiesLoaded }
				isChained={ isChained }
				filteredTicketEntities={ filteredTicketEntities }
				showTickets={ showTickets }
				ticketsSortedBy={ ticketsSortedBy }
				{ ...otherProps }
			/>;
		},
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
