/**
 * External imports
 */
import PropTypes from 'prop-types';

/**
 * Internal imports
 */
import useDatesListFilterStateSetters from './use-dates-list-filter-state-setters';
import DisplayDatesControl from './controls/display-dates-control';
import DatesSortedByControl from './controls/dates-sorted-by-control';
import ShowDatesControl from './controls/show-dates-control';

/**
 * filters for controlling the display of a list of Event Dates
 *
 * @param {string} listId
 * @param {string} showDates
 * @param {string} datesSortedBy
 * @param {string} displayDates
 * @return {Object} EditorDatesListView with added DateListFilters
 */
const DatesListEntityFilters = ( {
	listId,
	showDates,
	datesSortedBy,
	displayDates,
} ) => {
	const {
		setShowDates,
		setDatesSortedBy,
		setDisplayDates,
	} = useDatesListFilterStateSetters( listId );
	return (
		<>
			<div className="ee-show-dates-filter ee-filter-bar-filter">
				<ShowDatesControl
					showDates={ showDates }
					setShowDates={ setShowDates }
				/>
			</div>
			<div className="ee-sort-dates-filter ee-filter-bar-filter">
				<DatesSortedByControl
					datesSortedBy={ datesSortedBy }
					setDatesSortedBy={ setDatesSortedBy }
				/>
			</div>
			<div
				className="ee-display-dates-dates-filter ee-filter-bar-filter">
				<DisplayDatesControl
					displayDates={ displayDates }
					setDisplayDates={ setDisplayDates }
				/>
			</div>
		</>
	);
};

DatesListEntityFilters.propTypes = {
	listId: PropTypes.string.isRequired,
	showDates: PropTypes.string,
	datesSortedBy: PropTypes.string,
	displayDates: PropTypes.string,
};

export default DatesListEntityFilters;
