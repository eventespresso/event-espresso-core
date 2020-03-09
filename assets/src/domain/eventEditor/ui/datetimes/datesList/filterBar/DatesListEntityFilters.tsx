import React from 'react';

import SortByControl from './controls/SortByControl';
import DisplayStartOrEndDateControl from './controls/DisplayStartOrEndDateControl';
import DatetimesToShowControl from './controls/DatetimesToShowControl';
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
			<div className='ee-show-dates-filter ee-filter-bar-filter'>
				<DatetimesToShowControl datetimesToShow={datetimesToShow} setDatetimesToShow={setDatetimesToShow} />
			</div>
			<div className='ee-sort-dates-filter ee-filter-bar-filter'>
				<SortByControl sortBy={sortBy} setSortBy={setSortBy} />
			</div>
			<div className='ee-display-dates-dates-filter ee-filter-bar-filter'>
				<DisplayStartOrEndDateControl
					displayStartOrEndDate={displayStartOrEndDate}
					setDisplayStartOrEndDate={setDisplayStartOrEndDate}
				/>
			</div>
		</>
	);
};

export default DatesListEntityFilters;
