import { useMemo } from 'react';

import { DataStateManager } from '../types';
import { useTAMContext } from '../context';

const useDataState = (): DataStateManager => {
	const { dataState } = useTAMContext();

	return useMemo(() => dataState, [dataState]);
};

export default useDataState;
