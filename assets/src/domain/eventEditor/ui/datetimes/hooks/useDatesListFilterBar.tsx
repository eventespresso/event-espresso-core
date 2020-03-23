import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { FilterBarUISubscriptionCb } from '@appLayout/entityList/filterBar';
import { DatetimesFilterStateManager } from '@edtrServices/filterState';
import { DisplayStartOrEndDateControl, SortByControl, StatusControl } from '../datesList/filterBar/controls';

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
				<div className='ee-filter-bar__filter ee-dates-datetimes-to-show-filter'>
					<StatusControl setStatus={setStatus} status={status} />
				</div>
			);
		});

		registerFilterBarItem('sortBy', ({ filterState }) => {
			const { sortBy, setSortBy } = filterState;
			return (
				<div className='ee-dates-sort-by-filter ee-filter-bar-filter'>
					<SortByControl sortBy={sortBy} setSortBy={setSortBy} />
				</div>
			);
		});

		registerFilterBarItem('displayStartOrEndDate', ({ filterState }) => {
			const { displayStartOrEndDate, setDisplayStartOrEndDate } = filterState;
			return (
				<div className='ee-dates-display-start-or-end-date-filter ee-filter-bar-filter'>
					<DisplayStartOrEndDateControl
						displayStartOrEndDate={displayStartOrEndDate}
						setDisplayStartOrEndDate={setDisplayStartOrEndDate}
					/>
				</div>
			);
		});
	}, []);
};

export default useDatesListFilterBar;
