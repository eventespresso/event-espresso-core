import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { FilterBarUISubscriptionCb } from '@appLayout/entityList/filterBar';
import { TicketsFilterStateManager } from '@edtrServices/filterState';
import {
	DisplayStartOrEndDateControl,
	SortByControl,
	TicketsChainedButton,
	TicketsToShowControl,
} from '../ticketsList/filterBar/controls';

type TicketsListFilterBarCallback = FilterBarUISubscriptionCb<TicketsFilterStateManager, 'tickets-list'>;

const useTicketsListFilterBar = (): TicketsListFilterBarCallback => {
	return useCallback<TicketsListFilterBarCallback>(({ listId, registry }) => {
		// although this is not needed
		if (listId !== 'tickets-list') {
			return;
		}
		const { registerElement: registerFilterBarItem } = registry;

		registerFilterBarItem('ticketsToShow', ({ filterState }) => {
			const { ticketsToShow, setTicketsToShow } = filterState;
			return (
				<div className='ee-tickets-tickets-to-show-filter ee-filter-bar-filter'>
					<TicketsToShowControl ticketsToShow={ticketsToShow} setTicketsToShow={setTicketsToShow} />
				</div>
			);
		});

		registerFilterBarItem('isChained', ({ filterState }) => {
			const { isChained, toggleIsChained } = filterState;
			return (
				<div className='ee-ticket-dates-chained-filter ee-filter-bar-filter ee-filter-bar-filter--micro'>
					<TicketsChainedButton isChained={isChained} toggleIsChained={toggleIsChained} />
				</div>
			);
		});

		registerFilterBarItem('sortBy', ({ filterState }) => {
			const { sortBy, setSortBy } = filterState;
			return (
				<div className='ee-tickets-sort-by-filter ee-filter-bar-filter'>
					<SortByControl sortBy={sortBy} setSortBy={setSortBy} />
				</div>
			);
		});

		registerFilterBarItem('displayStartOrEndDate', ({ filterState }) => {
			const { displayStartOrEndDate, setDisplayStartOrEndDate } = filterState;
			return (
				<div className='ee-tickets-display-start-or-end-ticket-filter ee-filter-bar-filter'>
					<DisplayStartOrEndDateControl
						displayStartOrEndDate={displayStartOrEndDate}
						setDisplayStartOrEndDate={setDisplayStartOrEndDate}
					/>
				</div>
			);
		});
	}, []);
};

export default useTicketsListFilterBar;
