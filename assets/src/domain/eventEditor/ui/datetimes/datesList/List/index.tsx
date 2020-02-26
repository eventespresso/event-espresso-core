import React from 'react';
import { __ } from '@wordpress/i18n';
import { Divider, Typography } from 'antd';

import AddNewDateButton from '../AddNewDateButton';
import DatesListEntityFilters from '../filterBar/DatesListEntityFilters';
import { Datetime } from '../../../../services/apollo/types';
import { EntityList } from '@appLayout/entityList';

import useFilteredDatetimes from './useFilteredDatetimes';

interface ListProps {
	datetimes: Datetime[];
}

const { Title } = Typography;

const List: React.FC<ListProps> = ({ datetimes }) => {
	const { entityListProps, entityFiltersProps } = useFilteredDatetimes(datetimes);
	const header = (
		<Title level={3} style={{ marginBottom: '1.5rem' }}>
			{__('Dates List')}
		</Title>
	);
	const entityFilters = <DatesListEntityFilters {...entityFiltersProps} />;
	const listId = 'event-editor-dates-list';

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
