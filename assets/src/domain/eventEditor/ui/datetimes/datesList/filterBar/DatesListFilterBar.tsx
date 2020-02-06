import React from 'react';

import EntityListFilterBar from '../../../../../../application/ui/layout/entityList/filterBar/EntityListFilterBar';
import DatesListEntityFilters from './DatesListEntityFilters';

/**
 * DatesListFilterBar
 * filters for controlling the display of a list of Event Dates
 *

 * @return {Object} EditorDatesListView with added DateListFilters
 */
const DatesListFilterBar: React.FC = () => {
	const listId = 'event-editor-dates-list';
	const entityFilters = <DatesListEntityFilters />;

	return <EntityListFilterBar listId={listId} entityFilters={entityFilters} />;
};

export default DatesListFilterBar;
