import React from 'react';
import { __ } from '@wordpress/i18n';

import AddNewTicketButton from './AddNewTicketButton';
import { EntityList } from '@appLayout/entityList';
import { TableView } from './tableView';
import { TicketCard } from './cardView';
import TicketsListEntityFilters from './filterBar/TicketsListEntityFilters';
import { TypeName } from '@appServices/apollo/status';
import useTicketsListFilterState from './filterBar/useTicketsListFilterState';
import useTickets from '../../../services/apollo/queries/tickets/useTickets';

const TicketsList: React.FC = () => {
	const tickets = useTickets();
	const { filteredEntities, ...entityFiltersProps } = useTicketsListFilterState(tickets);
	const entityFilters = <TicketsListEntityFilters {...entityFiltersProps} />;

	return (
		<EntityList
			CardView={TicketCard}
			displayDates={entityFiltersProps.displayTicketDate}
			entities={filteredEntities}
			entityFilters={entityFilters}
			entityType={TypeName.tickets}
			footer={<AddNewTicketButton />}
			headerText={__('Available Tickets')}
			listId={'event-editor-tickets-list'}
			loadingText={__('loading tickets...')}
			TableView={TableView}
		/>
	);
};

export default TicketsList;
