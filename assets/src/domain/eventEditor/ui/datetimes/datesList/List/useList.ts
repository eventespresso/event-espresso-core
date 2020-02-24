import React from 'react';
import { Datetime } from '../../../../services/apollo/types';

import useEntityListFilterState from '@appLayout/entityList/filterBar/useEntityListFilterState';
import useDatesListFilterState from '../filterBar/useDatesListFilterState';
import { useEntityPagination } from '@appLayout/entityList/pagination';

const useList = (datetimes: Datetime[]): any => {
	const filterState = useEntityListFilterState();
	const { processedDates, ...filterBarProps } = useDatesListFilterState(datetimes);
	const { paginatedEntities, ...paginationProps } = useEntityPagination({
		entities: processedDates,
		perPage: filterState.perPage,
	});

	return {
		entities: paginatedEntities,
		filterBarProps,
		filterState,
		paginationProps,
	};
};

export default useList;
