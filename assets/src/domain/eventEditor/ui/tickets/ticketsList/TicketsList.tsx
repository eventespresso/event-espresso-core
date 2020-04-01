import React from 'react';
import { __ } from '@wordpress/i18n';

import AddNewTicketButton from './AddNewTicketButton';
import { EntityList } from '@appLayout/entityList';
import { legendConfig } from './config';
import { TicketsListProvider, withEntityListContext } from '@edtrServices/context/EntityListContext';
import { TypeName } from '@appServices/apollo/status';
import { useTicketsListFilterState } from '@edtrServices/filterState';
import { domain, ticketsList } from '@edtrServices/constants';
import { RenderCardView } from './cardView';
import { RenderTableView } from './tableView';

const TicketsList: React.FC = () => {
	const filterState = useTicketsListFilterState();

	return (
		<EntityList
			domain={domain}
			entityType={TypeName.tickets}
			filterState={filterState}
			footer={<AddNewTicketButton />}
			headerText={__('Available Tickets')}
			legendConfig={legendConfig}
			listId={ticketsList}
			loadingText={__('loading tickets...')}
			renderList={() => (filterState.view === 'card' ? <RenderCardView /> : <RenderTableView />)}
		/>
	);
};

export default withEntityListContext({
	Provider: TicketsListProvider,
	Component: TicketsList,
});
