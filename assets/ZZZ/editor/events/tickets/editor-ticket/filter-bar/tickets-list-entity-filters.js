/**
 * External imports
 */
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import useTicketsListFilterStateSetters
	from './use-tickets-list-filter-state-setters';
import DisplayTicketsControl from './controls/display-tickets-control';
import ShowTicketsControl from './controls/show-tickets-control';
import TicketsChainedButton from './controls/tickets-chained-button';
import TicketsSortedByControl from './controls/tickets-sorted-by-control';
import './style.css';

/**
 * filters for controlling the display of a list of Tickets
 *
 * @param {string} listId
 * @param {boolean} isChained
 * @param {string} showTickets
 * @param {string} ticketsSortedBy
 * @param {string} displayTicketDate
 * @return {Object} EditorTicketsListView with added TicketListFilters
 */
const TicketsListEntityFilters = ( {
	listId,
	isChained,
	showTickets,
	ticketsSortedBy,
	displayTicketDate,
} ) => {
	const {
		setShowTickets,
		setTicketsSortedBy,
		setDisplayTicketDate,
		setIsChained,
	} = useTicketsListFilterStateSetters( listId );
	return (
		<>
			<div className="ee-show-tickets-filter ee-filter-bar-filter">
				<ShowTicketsControl
					isChained={ isChained }
					showTickets={ showTickets }
					setShowTickets={ setShowTickets }
				/>
			</div>
			<div
				className="ee-ticket-dates-chained-filter ee-filter-bar-filter">
				<TicketsChainedButton
					isChained={ isChained }
					setIsChained={ setIsChained }
				/>
			</div>
			<div className="ee-sort-tickets-filter ee-filter-bar-filter">
				<TicketsSortedByControl
					ticketsSortedBy={ ticketsSortedBy }
					setTicketsSortedBy={ setTicketsSortedBy }
				/>
			</div>
			<div
				className="ee-display-ticket-dates-filter ee-filter-bar-filter">
				<DisplayTicketsControl
					displayTicketDate={ displayTicketDate }
					setDisplayTicketDate={ setDisplayTicketDate }
				/>
			</div>
		</>
	);
};

TicketsListEntityFilters.propTypes = {
	listId: PropTypes.string.isRequired,
	isChained: PropTypes.bool.isRequired,
	showTickets: PropTypes.string.isRequired,
	ticketsSortedBy: PropTypes.string.isRequired,
	displayTicketDate: PropTypes.string.isRequired,
};

export default TicketsListEntityFilters;
