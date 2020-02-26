import React from 'react';
import { __ } from '@wordpress/i18n';
import { Divider, Typography } from 'antd';

import AddNewDateButton from '../AddNewDateButton';
import DatesListEntityFilters from '../filterBar/DatesListEntityFilters';
import { Datetime } from '../../../../services/apollo/types';
import { EntityList } from '@appLayout/entityList';
import { DateCardList } from '../cardView';
import { TableView } from '../tableView';

import useDatesListFilterState from '../filterBar/useDatesListFilterState';

interface ListProps {
	datetimes: Datetime[];
}

const { Title } = Typography;

const List: React.FC<ListProps> = ({ datetimes }) => {
	const { processedDates, ...entityFiltersProps } = useDatesListFilterState(datetimes);

	const header = (
		<Title level={3} style={{ marginBottom: '1.5rem' }}>
			{__('Dates List')}
		</Title>
	);
	const entityFilters = <DatesListEntityFilters {...entityFiltersProps} />;
	const listId = 'event-editor-dates-list';

	const entityListProps = {
		entities: processedDates,
		EntityGridView: DateCardList,
		EntityListView: TableView,
	};

	return (
		<>
			{header}
			<EntityList {...entityListProps} entityFilters={entityFilters} listId={listId} />
			<Divider dashed />
			<AddNewDateButton />
		</>
	);
};

export default List;
