import React from 'react';

import { FilterStateManager } from './useDatesListFilterState/types';
import DatesSortedControl from './controls/DatesSortedControl';
import DisplayDatesControl from './controls/DisplayDatesControl';
import ShowDatesControl from './controls/ShowDatesControl';

type Props = Omit<FilterStateManager, 'dates' | 'filteredEntities'>;

/**
 * filters for controlling the display of a list of Event Dates
 */
const DatesListEntityFilters: React.FC<Props> = ({
	datesSortedBy,
	displayDates,
	setDatesSortedBy,
	setDisplayDates,
	setShowDates,
	showDates,
}) => {
	return (
		<>
			<div className='ee-show-dates-filter ee-filter-bar-filter'>
				<ShowDatesControl showDates={showDates} setShowDates={setShowDates} />
			</div>
			<div className='ee-sort-dates-filter ee-filter-bar-filter'>
				<DatesSortedControl datesSortedBy={datesSortedBy} setDatesSortedBy={setDatesSortedBy} />
			</div>
			<div className='ee-display-dates-dates-filter ee-filter-bar-filter'>
				<DisplayDatesControl displayDates={displayDates} setDisplayDates={setDisplayDates} />
			</div>
		</>
	);
};

export default DatesListEntityFilters;
