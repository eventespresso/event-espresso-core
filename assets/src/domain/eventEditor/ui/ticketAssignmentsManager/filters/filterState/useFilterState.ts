import { FilterStateManager } from './types';
import { useTAMContext } from '../../context';

const useFilterState = (): FilterStateManager => {
	const { filterState } = useTAMContext();

	return filterState;
};

export default useFilterState;
