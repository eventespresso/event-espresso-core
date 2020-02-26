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

import './styles.scss';

interface ListProps {
	datetimes: Datetime[];
}

const { Title } = Typography;

const List: React.FC<ListProps> = ({ datetimes }) => {
	const { processedDates, ...entityFiltersProps } = useDatesListFilterState(datetimes);
	const entityFilters = <DatesListEntityFilters {...entityFiltersProps} />;
	const header = (
		<Title className='event-editor-dates-list-header' level={3}>
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
