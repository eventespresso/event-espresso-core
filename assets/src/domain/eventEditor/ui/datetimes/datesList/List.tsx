import React from 'react';
import { __ } from '@wordpress/i18n';
import { Divider, Typography } from 'antd';

import AddNewDateButton from './AddNewDateButton';
import DatesListEntityFilters from './filterBar/DatesListEntityFilters';
import { Datetime } from '../../../services/apollo/types';
import { EntityList } from '@appLayout/entityList';

import { DateCardList } from './cardView';
import { TableView } from './tableView';

import useDatesListFilterState from './filterBar/useDatesListFilterState';

interface ListProps {
	datetimes: Datetime[];
}

const { Title } = Typography;

const List: React.FC<ListProps> = ({ datetimes }) => {
	const { processedDates, ...entityFiltersProps } = useDatesListFilterState(datetimes);
	const entityFilters = <DatesListEntityFilters {...entityFiltersProps} />;
	const header = (
		<Title level={3} style={{ marginBottom: '1.5rem' }}>
			{__('Dates List')}
		</Title>
	);
	const listId = 'event-editor-dates-list';

	return (
		<>
			{header}
			<EntityList
				entities={processedDates}
				entityFilters={entityFilters}
				EntityGridView={DateCardList}
				EntityListView={TableView}
				listId={listId}
			/>
			<Divider dashed />
			<AddNewDateButton />
		</>
	);
};

export default List;
