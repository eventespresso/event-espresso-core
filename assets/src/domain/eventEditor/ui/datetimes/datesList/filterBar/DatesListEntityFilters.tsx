import React from 'react';

import SortByControl from './controls/SortByControl';
import DateToDisplayControl from './controls/DateToDisplayControl';
import DatetimesToShowControl from './controls/DatetimesToShowControl';
import { useDatesListFilterState } from '@edtrServices/filterState';

/**
 * filters for controlling the display of a list of Event Dates
 */
const DatesListEntityFilters: React.FC = () => {
	const {
		dateToDisplay,
		datetimesToShow,
		setDateToDisplay,
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
				<DateToDisplayControl dateToDisplay={dateToDisplay} setDateToDisplay={setDateToDisplay} />
			</div>
		</>
	);
};

export default DatesListEntityFilters;
