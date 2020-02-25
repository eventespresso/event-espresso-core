import React from 'react';
import { __ } from '@wordpress/i18n';
import { H3 } from '@blueprintjs/core/lib/esm';
import { Divider } from 'antd';

import DatesListFilterBar from '../filterBar/DatesListFilterBar';
import AddNewDateButton from '../AddNewDateButton';
import { Datetime } from '../../../../services/apollo/types';
import { EntityList } from '@appLayout/entityList';
import { CardView } from '../cardView';
import { TableView } from '../tableView';

import useFilteredDatetimes from './useFilteredDatetimes';

interface ListProps {
	datetimes: Datetime[];
}

const List: React.FC<ListProps> = ({ datetimes }) => {
	const header = <H3 style={{ margin: '2rem 0 .5rem' }}>{__('Dates List')}</H3>;
	const { entities, filterBarProps, filterState, paginationProps } = useFilteredDatetimes(datetimes);

	const entityListProps = {
		...filterState,
		entities,
		EntityGridView: CardView,
		EntityListView: TableView,
		paginationProps,
	};

	return (
		<>
			{header}
			// @ts-ignore
			<DatesListFilterBar datesListFilterStateProps={filterBarProps} filterState={filterState} />
			<EntityList {...entityListProps} />
			<Divider dashed />
			<AddNewDateButton />
		</>
	);
};

export default List;
