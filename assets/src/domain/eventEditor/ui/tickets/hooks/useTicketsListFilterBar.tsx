import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { FilterBarSubscriptionCb } from '@appLayout/entityList/filterBar';
import { TicketsFilterStateManager as DFSM } from '@edtrServices/filterState';
import { TicketsToShowControl, SortByControl, DisplayStartOrEndDateControl } from '../ticketsList/filterBar/controls';

type TicketsListFilterBarCallback = FilterBarSubscriptionCb<DFSM, 'tickets-list'>;

const useTicketsListFilterBar = (): TicketsListFilterBarCallback => {
	return useCallback<TicketsListFilterBarCallback>(({ listId }, { registerElement: registerFilterBarItem }) => {
		// although this is not needed
		if (listId !== 'tickets-list') {
			return;
		}

		registerFilterBarItem(
			'ticketsToShow',
			({ filterState }) => {
				const { ticketsToShow, setTicketsToShow } = filterState;
				return (
					<div className='ee-tickets-tickets-to-show-filter ee-filter-bar-filter'>
						<TicketsToShowControl ticketsToShow={ticketsToShow} setTicketsToShow={setTicketsToShow} />
					</div>
				);
			},
			11
		);

		registerFilterBarItem('sortBy', ({ filterState }) => {
			const { sortBy, setSortBy } = filterState;
			return (
				<div className='ee-tickets-sort-by-filter ee-filter-bar-filter'>
					<SortByControl sortBy={sortBy} setSortBy={setSortBy} />
				</div>
			);
		});

		registerFilterBarItem(
			'displayStartOrEndDate',
			({ filterState }) => {
				const { displayStartOrEndDate, setDisplayStartOrEndDate } = filterState;
				return (
					<div className='ee-tickets-display-start-or-end-ticket-filter ee-filter-bar-filter'>
						<DisplayStartOrEndDateControl
							displayStartOrEndDate={displayStartOrEndDate}
							setDisplayStartOrEndDate={setDisplayStartOrEndDate}
						/>
					</div>
				);
			},
			9
		);
	}, []);
};

export default useTicketsListFilterBar;
