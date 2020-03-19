import { DataStateManager } from '../types';
import { useTAMContext } from '../context';

const useDataState = (): DataStateManager => {
	const { dataState } = useTAMContext();

	return dataState;
};

export default useDataState;
