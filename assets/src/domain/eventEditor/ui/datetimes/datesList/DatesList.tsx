import React, { Suspense } from 'react';
import { __ } from '@wordpress/i18n';

import AddNewDateButton from './AddNewDateButton';
import { DatetimesListProvider, withEntityListContext } from '@edtrServices/context/EntityListContext';
import { EntityList } from '@appLayout/entityList';
import { legendConfig } from './config';
import { LoadingNotice } from '@appDisplay/loadingNotice';
import { TypeName } from '@appServices/apollo/status';
import { useDatesListFilterState } from '@edtrServices/filterState';
import { domain, datesList } from '@edtrServices/constants';

const CardView = React.lazy(() => import(/* webpackChunkName: "dates-card-view" */ './cardView/CardView'));
const TableView = React.lazy(() => import(/* webpackChunkName: "dates-table-view" */ './tableView/TableView'));

const DatesList: React.FC = () => {
	const filterState = useDatesListFilterState();

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
			entityType={TypeName.datetimes}
			filterState={filterState}
			footer={<AddNewDateButton />}
			headerText={__('Event Dates')}
			legendConfig={legendConfig}
			listId={datesList}
			loadingText={__('loading event dates...')}
			renderList={() => (filterState.view === 'card' ? <RenderCardView /> : <RenderTableView />)}
		/>
	);
};

export default withEntityListContext({
	Provider: DatetimesListProvider,
	Component: DatesList,
});
