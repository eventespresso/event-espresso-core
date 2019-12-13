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
const DatesListFilterBar = ({ datetimes }) => {
	const listId = 'event-editor-dates-list';

	return (
		<EntityListFilterBar
			datetimes={datetimes}
			listId={listId}
			entityFilters={<DatesListEntityFilters listId={listId} />}
		/>
	);
};

export default DatesListFilterBar;
