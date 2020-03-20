import { DataStateManager } from './types';
import { useTPCContext } from '../context';

const useDataState = (): DataStateManager => {
	const { dataState } = useTPCContext();

	return dataState;
};

export default useDataState;
