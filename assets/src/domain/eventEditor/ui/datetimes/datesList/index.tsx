import React from 'react';
import { __ } from '@wordpress/i18n';

import AddNewDateButton from './AddNewDateButton';
import { DateCard } from './cardView';
import DatesListEntityFilters from './filterBar/DatesListEntityFilters';
import { EntityList } from '@appLayout/entityList';
import { TableView } from './tableView';
import { TypeName } from '@appServices/apollo/status';
import { DatetimesListProvider } from '@edtrServices/context/EntityListContext';
import { useDatesListFilterState, useFilteredDatetimes } from '@edtrServices/filterState';

const DatesList: React.FC = () => {
	const filteredDates = useFilteredDatetimes();
	const filterState = useDatesListFilterState();

	return (
		<EntityList
			CardView={DateCard}
			entities={filteredDates}
			filterState={filterState}
			entityFilters={<DatesListEntityFilters />}
			entityType={TypeName.datetimes}
			footer={<AddNewDateButton />}
			headerText={__('Event Dates')}
			listId={'event-editor-dates-list'}
			loadingText={__('loading event dates...')}
			TableView={TableView}
		/>
	);
};

const WrappedDatesList: React.FC = () => {
	return (
		<DatetimesListProvider>
			<DatesList />
		</DatetimesListProvider>
	);
};

export default WrappedDatesList;
