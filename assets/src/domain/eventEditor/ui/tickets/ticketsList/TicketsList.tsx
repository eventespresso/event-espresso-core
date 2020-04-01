import React, { Suspense } from 'react';
import { __ } from '@wordpress/i18n';

import AddNewTicketButton from './AddNewTicketButton';
import { EntityList } from '@appLayout/entityList';
import { legendConfig } from './config';
import { LoadingNotice } from '@appDisplay/loadingNotice';
import { TicketsListProvider, withEntityListContext } from '@edtrServices/context/EntityListContext';
import { TypeName } from '@appServices/apollo/status';
import { useTicketsListFilterState } from '@edtrServices/filterState';
import { domain, ticketsList } from '@edtrServices/constants';

const CardView = React.lazy(() => import(/* webpackChunkName: "tickets-card-view" */ './cardView/CardView'));
const TableView = React.lazy(() => import(/* webpackChunkName: "tickets-table-view" */ './tableView/TableView'));

const TicketsList: React.FC = () => {
	const filterState = useTicketsListFilterState();

	const RenderCardView = () => (
		<Suspense fallback={<LoadingNotice />}>
			<CardView />
		</Suspense>
	);

	const RenderTableView = () => (
		<Suspense fallback={<LoadingNotice />}>
			<TableView />
		</Suspense>
	);

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
