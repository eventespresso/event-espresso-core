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
			entities={filteredEntities}
			entityFilters={entityFilters}
			entityType={TypeName.datetimes}
			CardView={DateCard}
			TableView={TableView}
			footer={<AddNewDateButton />}
			listId={'event-editor-dates-list'}
			headerText={__('Event Dates')}
			loadingText={__('loading event dates...')}
		/>
	);
};

export default DatesList;
