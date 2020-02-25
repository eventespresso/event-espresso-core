import React from 'react';
import { __ } from '@wordpress/i18n';
import { H3 } from '@blueprintjs/core/lib/esm';
import { Divider } from 'antd';

import DatesListFilterBar from '../filterBar/DatesListFilterBar';
import AddNewDateButton from '../AddNewDateButton';
import { Datetime } from '../../../../services/apollo/types';
import { EntityList } from '@appLayout/entityList';

import useFilteredDatetimes from './useFilteredDatetimes';

interface ListProps {
	datetimes: Datetime[];
}

const List: React.FC<ListProps> = ({ datetimes }) => {
	const header = <H3 style={{ margin: '2rem 0 .5rem' }}>{__('Dates List')}</H3>;
	const { entityListProps, filterBarProps } = useFilteredDatetimes(datetimes);

	return (
		<>
			{header}
			<DatesListFilterBar {...filterBarProps} />
			<EntityList {...entityListProps} />
			<Divider dashed />
			<AddNewDateButton />
		</>
	);
};

export default List;
