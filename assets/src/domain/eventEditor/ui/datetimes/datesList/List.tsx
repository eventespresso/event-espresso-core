import React from 'react';
import { __ } from '@wordpress/i18n';
import { H3 } from '@blueprintjs/core/lib/esm';

import DatesListFilterBar from './filterBar/DatesListFilterBar';
import AddNewDateButton from './AddNewDateButton';
import { Datetime } from '@edtrServices/apollo/types';

import { EntityList } from '@appLayout/entityList';
import useEntityListFilterState from '@appLayout/entityList/filterBar/useEntityListFilterState';
import useDatesListFilterState from './filterBar/useDatesListFilterState';
import GridView from './views/Grid';
import ListView from './views/List';

interface ListProps {
	datetimes: Datetime[];
}

const List: React.FC<ListProps> = ({ datetimes }) => {
	const header = <H3 style={{ margin: '2rem 0 .5rem' }}>{__('Dates List')}</H3>;
	const filterState = useEntityListFilterState();
	const { processedDates, ...datesListFilterStateProps } = useDatesListFilterState(datetimes);

	const entityListProps = {
		...filterState,
		entities: processedDates,
		EntityGridView: GridView,
		EntityListView: ListView,
	};

	return (
		<>
			{header}
			<DatesListFilterBar datesListFilterStateProps={datesListFilterStateProps} filterState={filterState} />
			<EntityList {...entityListProps} />
			<AddNewDateButton />
		</>
	);
};

export default List;
