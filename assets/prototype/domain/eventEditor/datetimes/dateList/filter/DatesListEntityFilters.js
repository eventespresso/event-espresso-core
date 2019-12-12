/**
 * Internal imports
 */
import DatesSortedByControl from './controls/DatesSortedByControl';
import DisplayDatesControl from './controls/DisplayDatesControl';
import ShowDatesControl from './controls/ShowDatesControl';

/**
 * filters for controlling the display of a list of Event Dates
 *
 * @param {string} showDates
 * @param {string} datesSortedBy
 * @param {string} displayDates
 * @return {Object} EditorDatesListView with added DateListFilters
 */
const DatesListEntityFilters = ({ showDates, datesSortedBy, displayDates }) => {
	const { setShowDates, setDatesSortedBy, setDisplayDates } = {
		setShowDates: () => null,
		setDatesSortedBy: () => null,
		setDisplayDates: () => null,
	};

	return (
		<>
			<div className='ee-show-dates-filter ee-filter-bar-filter'>
				<ShowDatesControl showDates={showDates} setShowDates={setShowDates} />
			</div>
			<div className='ee-sort-dates-filter ee-filter-bar-filter'>
				<DatesSortedByControl datesSortedBy={datesSortedBy} setDatesSortedBy={setDatesSortedBy} />
			</div>
			<div className='ee-display-dates-dates-filter ee-filter-bar-filter'>
				<DisplayDatesControl displayDates={displayDates} setDisplayDates={setDisplayDates} />
			</div>
		</>
	);
};

export default DatesListEntityFilters;
