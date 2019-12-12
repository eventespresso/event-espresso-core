import EntityListFilterBar from '../../../../../application/ui/components/display/entityListFilterBar/EntityListFilterBar';
import DatesListEntityFilters from './DatesListEntityFilters';

/**
 * DatesListFilterBar
 * filters for controlling the display of a list of Event Dates
 *
 * @param {string} showDates
 * @param {string} datesSortedBy
 * @param {string} displayDates
 * @param {string} searchText
 * @param {number} perPage
 * @param {string} view

 * @return {Object} EditorDatesListView with added DateListFilters
 */
const DatesListFilterBar = ({ showDates, datesSortedBy, displayDates, searchText, perPage, view }) => {
	const listId = 'event-editor-dates-list';

	return (
		<EntityListFilterBar
			listId={listId}
			view={view}
			perPage={perPage}
			searchText={searchText}
			entityFilters={
				<DatesListEntityFilters
					listId={listId}
					showDates={showDates}
					datesSortedBy={datesSortedBy}
					displayDates={displayDates}
				/>
			}
		/>
	);
};

export default DatesListFilterBar;
