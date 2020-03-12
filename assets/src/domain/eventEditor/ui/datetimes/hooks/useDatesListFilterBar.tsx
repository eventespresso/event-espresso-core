import React, { useCallback } from 'react';
import { __ } from '@wordpress/i18n';

import { FilterBarSubscriptionCb } from '@appLayout/entityList/filterBar';
import { DatetimesFilterStateManager } from '@edtrServices/filterState';
import { DatetimesToShowControl, SortByControl, DisplayStartOrEndDateControl } from '../datesList/filterBar/controls';

type DatesListFilterBarCallback = FilterBarSubscriptionCb<DatetimesFilterStateManager, 'dates-list'>;

const useDatesListFilterBar = (): DatesListFilterBarCallback => {
	return useCallback<DatesListFilterBarCallback>(({ listId }, { registerElement: registerFilterBarItem }) => {
		// although this is not needed
		if (listId !== 'dates-list') {
			return;
		}

		registerFilterBarItem('datetimesToShow', ({ filterState }) => {
			const { datetimesToShow, setDatetimesToShow } = filterState;
			return (
				<div className='ee-dates-datetimes-to-show-filter ee-filter-bar-filter'>
					<DatetimesToShowControl datetimesToShow={datetimesToShow} setDatetimesToShow={setDatetimesToShow} />
				</div>
			);
		});

		registerFilterBarItem(
			'sortBy',
			({ filterState }) => {
				const { sortBy, setSortBy } = filterState;
				return (
					<div className='ee-dates-sort-by-filter ee-filter-bar-filter'>
						<SortByControl sortBy={sortBy} setSortBy={setSortBy} />
					</div>
				);
			},
			8
		);

		registerFilterBarItem(
			'displayStartOrEndDate',
			({ filterState }) => {
				const { displayStartOrEndDate, setDisplayStartOrEndDate } = filterState;
				return (
					<div className='ee-dates-display-start-or-end-date-filter ee-filter-bar-filter'>
						<DisplayStartOrEndDateControl
							displayStartOrEndDate={displayStartOrEndDate}
							setDisplayStartOrEndDate={setDisplayStartOrEndDate}
						/>
					</div>
				);
			},
			7
		);
	}, []);
};

export default useDatesListFilterBar;
