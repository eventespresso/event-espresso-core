import { Datetime } from '../../../../services/apollo/types';
import { DateCardList } from '../cardView';
import { TableView } from '../tableView';

import useEntityListFilterState from '@appLayout/entityList/filterBar/useEntityListFilterState';
import useDatesListFilterState from '../filterBar/useDatesListFilterState';
import { useEntityPagination } from '@appLayout/entityList/pagination';

const useFilteredDatetimes = (datetimes: Datetime[]): any => {
	const filterState = useEntityListFilterState();
	const { processedDates, ...entityFiltersProps } = useDatesListFilterState(datetimes);
	const { paginatedEntities, ...paginationProps } = useEntityPagination({
		entities: processedDates,
		perPage: filterState.perPage,
	});

	const filterBarProps = {
		entityFiltersProps,
		filterState,
	};

	const viewProps = {
		EntityGridView: DateCardList,
		EntityListView: TableView,
		view: filterState.view,
	};

	const entityListProps = {
		...viewProps,
		entities: paginatedEntities,
		paginationProps,
	};

	return {
		entityListProps,
		filterBarProps,
		filterState,
		paginationProps,
	};
};

export default useFilteredDatetimes;
