import React from 'react';
import { __ } from '@wordpress/i18n';

import { EntityList } from '@appLayout/entityList';
import AddNewDateButton from './AddNewDateButton';
import { DateCard } from './cardView';
import { TableView } from './tableView';
import DatesListEntityFilters from './filterBar/DatesListEntityFilters';
import useDatesListFilterState from './filterBar/useDatesListFilterState';
import { TypeName } from '@appServices/apollo/status';
import useDatetimes from '../../../services/apollo/queries/datetimes/useDatetimes';

const DatesList: React.FC = () => {
	const datetimes = useDatetimes();
	const { filteredEntities, ...entityFiltersProps } = useDatesListFilterState(datetimes);
	const entityFilters = <DatesListEntityFilters {...entityFiltersProps} />;

	return (
		<EntityList
			CardView={DateCard}
			displayDates={entityFiltersProps.displayDates}
			entities={filteredEntities}
			entityFilters={entityFilters}
			entityType={TypeName.datetimes}
			footer={<AddNewDateButton />}
			headerText={__('Event Dates')}
			listId={'event-editor-dates-list'}
			loadingText={__('loading event dates...')}
			TableView={TableView}
		/>
	);
};

export default DatesList;
