import React from 'react';
import { __ } from '@wordpress/i18n';

import AddNewDateButton from './AddNewDateButton';
import { DateCard } from './cardView';
import { DatetimesListProvider, withEntityListContext } from '@edtrServices/context/EntityListContext';
import { useDatetimes } from '@edtrServices/apollo/queries';
import { EntityList } from '@appLayout/entityList';
import { TableView } from './tableView';
import { TypeName } from '@appServices/apollo/status';
import { useDatesListFilterState } from '@edtrServices/filterState';
import { domain, datesList } from '@edtrServices/constants';

const DatesList: React.FC = () => {
	const datetimes = useDatetimes();
	const filterState = useDatesListFilterState();

	return (
		<EntityList
			CardView={DateCard}
			domain={domain}
			entities={datetimes}
			entityType={TypeName.datetimes}
			filterState={filterState}
			footer={<AddNewDateButton />}
			headerText={__('Event Dates')}
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
