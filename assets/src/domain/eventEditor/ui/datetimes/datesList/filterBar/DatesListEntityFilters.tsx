import React from 'react';

import { DatetimesToShowControl, DisplayStartOrEndDateControl, SortByControl } from './controls';
import { useDatesListFilterState } from '@edtrServices/filterState';

/**
 * filters for controlling the display of a list of Event Dates
 */
const DatesListEntityFilters: React.FC = () => {
	const {
		displayStartOrEndDate,
		datetimesToShow,
		setDisplayStartOrEndDate,
		setDatetimesToShow,
		setSortBy,
		sortBy,
	} = useDatesListFilterState();
	return (
		<>
			<div className='ee-dates-datetimes-to-show-filter ee-filter-bar-filter'>
				<DatetimesToShowControl datetimesToShow={datetimesToShow} setDatetimesToShow={setDatetimesToShow} />
			</div>
			<div className='ee-dates-sort-by-filter ee-filter-bar-filter'>
				<SortByControl sortBy={sortBy} setSortBy={setSortBy} />
			</div>
			<div className='ee-dates-display-start-or-end-date-filter ee-filter-bar-filter'>
				<DisplayStartOrEndDateControl
					displayStartOrEndDate={displayStartOrEndDate}
					setDisplayStartOrEndDate={setDisplayStartOrEndDate}
				/>
			</div>
		</>
	);
};

export default DatesListEntityFilters;
