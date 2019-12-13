import EntityListFilterBar from '../../../../../application/ui/components/display/entityListFilterBar/EntityListFilterBar';
import DatesListEntityFilters from './DatesListEntityFilters';

/**
 * DatesListFilterBar
 * filters for controlling the display of a list of Event Dates
 *

 * @return {Object} EditorDatesListView with added DateListFilters
 */
const DatesListFilterBar = () => {
	const listId = 'event-editor-dates-list';
	const entityFilters = <DatesListEntityFilters listId={listId} />;

	return <EntityListFilterBar listId={listId} entityFilters={entityFilters} />;
};

export default DatesListFilterBar;
