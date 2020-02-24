import React from 'react';

import EntityListFilterBar from '@appLayout/entityList/filterBar/EntityListFilterBar';
import DatesListEntityFilters from './DatesListEntityFilters';

/**
 * DatesListFilterBar
 * filters for controlling the display of a list of Event Dates
 *
 * @return {Object} EditorDatesListView with added DateListFilters
 */
const DatesListFilterBar: React.FC = ({ filterState, datesListFilterStateProps }: any) => {
	const listId = 'event-editor-dates-list';
	const entityFilters = <DatesListEntityFilters {...datesListFilterStateProps} />;

	return <EntityListFilterBar entityFilters={entityFilters} filterState={filterState} listId={listId} />;
};

export default DatesListFilterBar;
