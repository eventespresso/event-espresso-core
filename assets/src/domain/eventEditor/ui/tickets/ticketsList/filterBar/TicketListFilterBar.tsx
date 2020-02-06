import React from 'react';

import EntityListFilterBar from '../../../../../../application/ui/layout/entityList/filterBar/EntityListFilterBar';
import TicketsListEntityFilters from './TicketsListEntityFilters';

/**
 * TicketListFilterBar
 * filters for controlling the display of a list of Event Tickets
 *
 * @return {Object} EditorTicketsListView with added TicketListFilters
 */
const TicketListFilterBar: React.FC = () => {
	const listId = 'event-editor-tickets-list';
	const entityFilters = <TicketsListEntityFilters />;

	return <EntityListFilterBar listId={listId} entityFilters={entityFilters} />;
};

export default TicketListFilterBar;
