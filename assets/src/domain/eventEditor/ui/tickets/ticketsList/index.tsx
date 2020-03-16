import React from 'react';
import { __ } from '@wordpress/i18n';

import AddNewTicketButton from './AddNewTicketButton';
import { EntityList } from '@appLayout/entityList';
import { CardView } from './cardView';
import { TableView } from './tableView';
import { useTickets } from '@edtrServices/apollo/queries';
import { TicketsListProvider, withEntityListContext } from '@edtrServices/context/EntityListContext';
import { TypeName } from '@appServices/apollo/status';
import { useTicketsListFilterState } from '@edtrServices/filterState';
import { domain, ticketsList } from '@edtrServices/constants';

const TicketsList: React.FC = () => {
	const tickets = useTickets();
	const filterState = useTicketsListFilterState();

	return (
		<EntityList
			CardView={CardView}
			domain={domain}
			entities={tickets}
			entityType={TypeName.tickets}
			filterState={filterState}
			footer={<AddNewTicketButton />}
			headerText={__('Available Tickets')}
			listId={ticketsList}
			loadingText={__('loading tickets...')}
			TableView={TableView}
		/>
	);
};

export default withEntityListContext({
	Provider: TicketsListProvider,
	Component: TicketsList,
});
