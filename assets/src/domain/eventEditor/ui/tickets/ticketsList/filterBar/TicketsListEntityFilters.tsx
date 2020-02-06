import React from 'react';
/**
 * Internal dependencies
 */
import DisplayTicketsControl from './controls/DisplayTicketsControl';
import ShowTicketsControl from './controls/ShowTicketsControl';
import TicketsChainedButton from './controls/TicketsChainedButton';
import TicketsSortedByControl from './controls/TicketsSortedByControl';
import useTicketListFilterState from './useTicketListFilterState';
import './style.css';

/**
 * filters for controlling the display of a list of Tickets
 *
 * @return {Object} EditorTicketsListView with added TicketListFilters
 */
const TicketsListEntityFilters: React.FC = () => {
	const {
		displayTicketDate,
		isChained,
		setDisplayTicketDate,
		setShowTickets,
		setSortTicketsBy,
		showTickets,
		sortTicketsBy,
		toggleIsChained,
	} = useTicketListFilterState();

	return (
		<>
			<div className='ee-show-tickets-filter ee-filter-bar-filter'>
				<ShowTicketsControl isChained={isChained} showTickets={showTickets} setShowTickets={setShowTickets} />
			</div>
			<div className='ee-ticket-dates-chained-filter ee-filter-bar-filter'>
				<TicketsChainedButton isChained={isChained} toggleIsChained={toggleIsChained} />
			</div>
			<div className='ee-sort-tickets-filter ee-filter-bar-filter'>
				<TicketsSortedByControl sortTicketsBy={sortTicketsBy} setSortTicketsBy={setSortTicketsBy} />
			</div>
			<div className='ee-display-ticket-dates-filter ee-filter-bar-filter'>
				<DisplayTicketsControl
					displayTicketDate={displayTicketDate}
					setDisplayTicketDate={setDisplayTicketDate}
				/>
			</div>
		</>
	);
};

export default TicketsListEntityFilters;
