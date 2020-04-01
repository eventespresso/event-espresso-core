import { DatetimesListContextProps, useDatesListContext } from '../../context/EntityListContext';

const useDatesListFilterState = (): DatetimesListContextProps['filterState'] => {
	return useDatesListContext().filterState;
};
export default useDatesListFilterState;
