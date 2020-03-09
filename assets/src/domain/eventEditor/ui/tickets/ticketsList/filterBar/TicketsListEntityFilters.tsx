import React from 'react';

import { DisplayStartOrEndDateControl, SortByControl, TicketsChainedButton, TicketsToShowControl } from './controls';
import { useTicketsListFilterState } from '@edtrServices/filterState';
import './style.scss';

/**
 * filters for controlling the display of a list of Tickets
 */
const TicketsListEntityFilters: React.FC = () => {
	const {
		displayStartOrEndDate,
		isChained,
		setDisplayStartOrEndDate,
		setSortBy,
		setTicketsToShow,
		sortBy,
		ticketsToShow,
		toggleIsChained,
	} = useTicketsListFilterState();

	return (
		<>
			<div className='ee-tickets-to-show-filter ee-filter-bar-filter ee-filter-bar-filter--bigger'>
				<TicketsToShowControl
					isChained={isChained}
					ticketsToShow={ticketsToShow}
					setTicketsToShow={setTicketsToShow}
				/>
			</div>
			<div className='ee-ticket-dates-chained-filter ee-filter-bar-filter ee-filter-bar-filter--micro'>
				<TicketsChainedButton isChained={isChained} toggleIsChained={toggleIsChained} />
			</div>
			<div className='ee-tickets-sort-by-filter ee-filter-bar-filter'>
				<SortByControl sortBy={sortBy} setSortBy={setSortBy} />
			</div>
			<div className='ee-tickets-display-start-or-end-date-filter ee-filter-bar-filter'>
				<DisplayStartOrEndDateControl
					displayStartOrEndDate={displayStartOrEndDate}
					setDisplayStartOrEndDate={setDisplayStartOrEndDate}
				/>
			</div>
		</>
	);
};

export default TicketsListEntityFilters;
