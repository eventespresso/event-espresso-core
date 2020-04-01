import { TicketsListContextProps, useTicketsListContext } from '../../context/EntityListContext';

const useTicketsListFilterState = (): TicketsListContextProps['filterState'] => {
	return useTicketsListContext().filterState;
};
export default useTicketsListFilterState;
