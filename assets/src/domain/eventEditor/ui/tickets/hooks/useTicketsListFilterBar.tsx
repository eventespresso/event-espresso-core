import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { FilterBarUISubscriptionCb } from '@appLayout/entityList/filterBar';
import { TicketsFilterStateManager } from '@edtrServices/filterState';
import {
	DisplayStartOrEndDateControl,
	SalesControl,
	SortByControl,
	TicketsChainedButton,
	StatusControl,
} from '../ticketsList/filterBar/controls';

type TicketsListFilterBarCallback = FilterBarUISubscriptionCb<TicketsFilterStateManager, 'tickets-list'>;

const useTicketsListFilterBar = (): TicketsListFilterBarCallback => {
	return useCallback<TicketsListFilterBarCallback>(({ listId, registry }) => {
		// although this is not needed
		if (listId !== 'tickets-list') {
			return;
		}
		const { registerElement: registerFilterBarItem } = registry;

		registerFilterBarItem('sales', ({ filterState }) => {
			const { sales, setSales } = filterState;
			return (
				<div className='ee-filter-bar__filter ee-dates-datetimes-to-show-filter'>
					<SalesControl sales={sales} setSales={setSales} />
				</div>
			);
		});

		registerFilterBarItem('status', ({ filterState }) => {
			const { status, setStatus } = filterState;
			return (
				<div className='ee-filter-bar__filter ee-dates-datetimes-to-show-filter'>
					<StatusControl setStatus={setStatus} status={status} />
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
