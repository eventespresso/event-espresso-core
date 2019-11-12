/**
 * External imports
 */
import PropTypes from 'prop-types';
import { EntityListFilterBar } from '@eventespresso/components';

import TicketsListEntityFilters from './tickets-list-entity-filters';

/**
 * TicketsListFilterBar
 * filters for controlling the display of a list of Event Dates
 *
 * @param {string} listId
 * @param {string} showTickets
 * @param {string} ticketsSortedBy
 * @param {string} displayTicketDate
 * @param {boolean} isChained
 * @param {string} searchText
 * @param {number} perPage
 * @param {string} view

 * @return {Object} EditorDatesListView with added DateListFilters
 */
const TicketsListFilterBar = ( {
	listId,
	showTickets,
	ticketsSortedBy,
	displayTicketDate,
	isChained,
	searchText,
	perPage,
	view,
} ) => {
	return (
		<EntityListFilterBar
			listId={ listId }
			view={ view }
			perPage={ perPage }
			searchText={ searchText }
			entityFilters={
				<TicketsListEntityFilters
					listId={ listId }
					showTickets={ showTickets }
					ticketsSortedBy={ ticketsSortedBy }
					displayTicketDate={ displayTicketDate }
					isChained={ isChained }
				/>
			}
		/>
	);
};

TicketsListFilterBar.propTypes = {
	listId: PropTypes.string.isRequired,
	showTickets: PropTypes.string,
	ticketsSortedBy: PropTypes.string,
	displayTicketDate: PropTypes.string,
	isChained: PropTypes.bool,
	searchText: PropTypes.string,
	perPage: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.number,
	] ),
	view: PropTypes.string,
};

export default TicketsListFilterBar;
