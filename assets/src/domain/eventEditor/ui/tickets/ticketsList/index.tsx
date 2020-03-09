import React from 'react';
import { __ } from '@wordpress/i18n';

import AddNewTicketButton from './AddNewTicketButton';
import { EntityList } from '@appLayout/entityList';
import { TableView } from './tableView';
import { TicketsListProvider, withEntityListContext } from '@edtrServices/context/EntityListContext';
import { TicketCard } from './cardView';
import { TicketsListEntityFilters } from './filterBar';
import { TypeName } from '@appServices/apollo/status';
import { useTicketsListFilterState, useFilteredTickets } from '@edtrServices/filterState';

const TicketsList: React.FC = () => {
	const filteredTickets = useFilteredTickets();
	const filterState = useTicketsListFilterState();

	return (
		<EntityList
			CardView={TicketCard}
			entities={filteredTickets}
			filterState={filterState}
			entityFilters={<TicketsListEntityFilters />}
			entityType={TypeName.tickets}
			footer={<AddNewTicketButton />}
			headerText={__('Available Tickets')}
			listId={'event-editor-tickets-list'}
			loadingText={__('loading tickets...')}
			TableView={TableView}
		/>
	);
};

export default withEntityListContext({ Provider: TicketsListProvider, Component: TicketsList });
