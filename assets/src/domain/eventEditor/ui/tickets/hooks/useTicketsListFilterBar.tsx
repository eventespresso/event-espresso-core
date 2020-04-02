import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { FilterBarUISubscriptionCb } from '@appLayout/entityList/filterBar';
import { TicketsFilterStateManager } from '@edtrServices/filterState';
import {
	DisplayStartOrEndDateControl,
	SalesControl,
	SortByControl,
	IsChainedButton,
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

		registerFilterBarItem('status', ({ filterState }) => {
			const { isChained, status, setStatus } = filterState;
			return (
				<div className='ee-filter-bar__filter'>
					<StatusControl isChained={isChained} setStatus={setStatus} status={status} />
				</div>
			);
		});

		registerFilterBarItem('isChained', ({ filterState }) => {
			const { isChained, toggleIsChained } = filterState;
			return (
				<div className='ee-filter-bar__chain ee-filter-bar__filter ee-filter-bar__filter--micro'>
					<IsChainedButton isChained={isChained} toggleIsChained={toggleIsChained} />
				</div>
			);
		});

		registerFilterBarItem('sales', ({ filterState }) => {
			const { sales, setSales } = filterState;
			return (
				<div className='ee-filter-bar__filter'>
					<SalesControl sales={sales} setSales={setSales} />
				</div>
			);
		});

		registerFilterBarItem('displayStartOrEndDate', ({ filterState }) => {
			const { displayStartOrEndDate, setDisplayStartOrEndDate } = filterState;
			return (
				<div className='ee-filter-bar__filter'>
					<DisplayStartOrEndDateControl
						displayStartOrEndDate={displayStartOrEndDate}
						setDisplayStartOrEndDate={setDisplayStartOrEndDate}
					/>
				</div>
			);
		});

		registerFilterBarItem('sortBy', ({ filterState }) => {
			const { sortBy, setSortBy } = filterState;
			return (
				<div className='ee-filter-bar__filter'>
					<SortByControl sortBy={sortBy} setSortBy={setSortBy} />
				</div>
			);
		});
	}, []);
};

export default useTicketsListFilterBar;
