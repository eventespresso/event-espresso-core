import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { FilterBarUISubscriptionCb } from '@appLayout/entityList/filterBar';
import { DatetimesFilterStateManager } from '@edtrServices/filterState';
import {
	DisplayStartOrEndDateControl,
	SalesControl,
	SortByControl,
	StatusControl,
} from '../datesList/filterBar/controls';

type DatesListFilterBarCallback = FilterBarUISubscriptionCb<DatetimesFilterStateManager, 'dates-list'>;

const useDatesListFilterBar = (): DatesListFilterBarCallback => {
	return useCallback<DatesListFilterBarCallback>(({ listId, registry }) => {
		// although this is not needed
		if (listId !== 'dates-list') {
			return;
		}
		const { registerElement: registerFilterBarItem } = registry;

		registerFilterBarItem('status', ({ filterState }) => {
			const { status, setStatus } = filterState;
			return (
				<div className='ee-filter-bar__filter'>
					<StatusControl setStatus={setStatus} status={status} />
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
				<div className='ee-filter-bar__select'>
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
				<div className='ee-filter-bar__select'>
					<SortByControl sortBy={sortBy} setSortBy={setSortBy} />
				</div>
			);
		});
	}, []);
};

export default useDatesListFilterBar;
