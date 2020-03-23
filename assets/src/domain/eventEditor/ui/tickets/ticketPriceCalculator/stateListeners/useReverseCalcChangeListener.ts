import { useEffect } from 'react';

import { useDataState } from '../data';
import { StateChangeListenerHook } from './types';

const useReverseCalcChangeListener: StateChangeListenerHook = (calculatePrice) => {
	const { reverseCalculate } = useDataState();

	// Because of the deps, it will run only when reverseCalculate changes
	useEffect(() => {
		calculatePrice();
		console.log('reverseCalculate changed to: ', reverseCalculate);
	}, [reverseCalculate]);
};

export default useReverseCalcChangeListener;
