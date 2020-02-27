import React from 'react';
import { __ } from '@wordpress/i18n';
import { Divider, Typography } from 'antd';

import { EntityList } from '@appLayout/entityList';
import AddNewDateButton from './AddNewDateButton';
import { CardView } from './cardView';
import { TableView } from './tableView';
import DatesListEntityFilters from './filterBar/DatesListEntityFilters';
import useDatesListFilterState from './filterBar/useDatesListFilterState';
import { Datetime } from '../../../services/apollo/types';
import './styles.scss';

const { Title } = Typography;

interface ListProps {
	datetimes: Datetime[];
}

const List: React.FC<ListProps> = ({ datetimes }) => {
	const { processedDates, ...entityFiltersProps } = useDatesListFilterState(datetimes);
	const entityFilters = <DatesListEntityFilters {...entityFiltersProps} />;
	const listId = 'event-editor-dates-list';

	return (
		<>
			<Title className='event-editor-dates-list-header' level={3}>
				{__('Dates List')}
			</Title>
			<EntityList
				entities={processedDates}
				entityFilters={entityFilters}
				EntityGridView={CardView}
				EntityListView={TableView}
				listId={listId}
			/>
			<Divider dashed />
			<AddNewDateButton />
		</>
	);
};

export default List;
