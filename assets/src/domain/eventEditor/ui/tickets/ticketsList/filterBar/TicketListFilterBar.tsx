import React from 'react';

import EntityListFilterBar from '@appLayout/entityList/filterBar/EntityListFilterBar';
import useEntityListFilterState from '@appLayout/entityList/filterBar/useEntityListFilterState';
import TicketsListEntityFilters from './TicketsListEntityFilters';

/**
 * TicketListFilterBar
 * filters for controlling the display of a list of Event Tickets
 *
 * @return {Object} EditorTicketsListView with added TicketListFilters
 */
const TicketListFilterBar: React.FC = () => {
	const filterState = useEntityListFilterState();
	const listId = 'event-editor-tickets-list';
	const entityFilters = <TicketsListEntityFilters />;

	return <EntityListFilterBar entityFilters={entityFilters} filterState={filterState} listId={listId} />;
};

export default TicketListFilterBar;
