import React from 'react';
import { __ } from '@wordpress/i18n';

import { EntityList } from '@appLayout/entityList';
import AddNewTicketButton from './AddNewTicketButton';
import { TicketCard } from './cardView';
// import { TableView } from './tableView';
import TicketsListEntityFilters from './filterBar/TicketsListEntityFilters';
import useTicketsListFilterState from './filterBar/useTicketsListFilterState';
import { TypeName } from '@appServices/apollo/status';
import useTickets from '../../../services/apollo/queries/tickets/useTickets';

const TicketsList: React.FC = () => {
	const tickets = useTickets();
	const { filteredEntities, ...entityFiltersProps } = useTicketsListFilterState(tickets);
	const entityFilters = <TicketsListEntityFilters {...entityFiltersProps} />;

	return (
		<EntityList
			entities={filteredEntities}
			entityFilters={entityFilters}
			entityType={TypeName.tickets}
			CardView={TicketCard}
			TableView={null}
			footer={<AddNewTicketButton />}
			listId={'event-editor-tickets-list'}
			headerText={__('Available Tickets')}
			loadingText={__('loading tickets...')}
		/>
	);
};

export default TicketsList;
