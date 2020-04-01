import React from 'react';
import { __ } from '@wordpress/i18n';

import AddNewDateButton from './AddNewDateButton';
import { DatetimesListProvider, withEntityListContext } from '@edtrServices/context/EntityListContext';
import { EntityList } from '@appLayout/entityList';
import { legendConfig } from './config';
import { TypeName } from '@appServices/apollo/status';
import { useDatesListFilterState } from '@edtrServices/filterState';
import { domain, datesList } from '@edtrServices/constants';
import { RenderCardView } from './cardView';
import { RenderTableView } from './tableView';

const DatesList: React.FC = () => {
	const filterState = useDatesListFilterState();

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
