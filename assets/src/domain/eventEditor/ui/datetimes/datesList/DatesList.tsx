import React from 'react';
import { __ } from '@wordpress/i18n';

import AddNewDateButton from './AddNewDateButton';
import { CardViewLoader } from './cardView';
import {
	DatetimesListContext,
	DatetimesListProvider,
	withEntityListContext,
} from '@edtrServices/context/EntityListContext';
import { EntityList } from '@appLayout/entityList';
import { legendConfig } from './config';
import { TableView } from './tableView';
import { TypeName } from '@appServices/apollo/status';
import { useDatesListFilterState } from '@edtrServices/filterState';
import { domain, datesList } from '@edtrServices/constants';

const DatesList: React.FC = () => {
	const filterState = useDatesListFilterState();

	return (
		<EntityList
			CardView={CardViewLoader}
			context={DatetimesListContext}
			domain={domain}
			entityType={TypeName.datetimes}
			filterState={filterState}
			footer={<AddNewDateButton />}
			headerText={__('Event Dates')}
			legendConfig={legendConfig}
			listId={datesList}
			loadingText={__('loading event dates...')}
			TableView={TableView}
		/>
	);
};

export default withEntityListContext({
	Provider: DatetimesListProvider,
	Component: DatesList,
});
