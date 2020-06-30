import { useCallback, useMemo, useReducer } from 'react';

import { EdtrState, EdtrStateManager } from './types';
import reducer from './reducer';
import { useMemoStringify } from '@application/services/hooks';

// create shorter alias to use at multiple places.
type ESM = EdtrStateManager;

const initialState: EdtrState = {
	visibleDatetimeIds: [],
	pricesPollInterval: 0, // no polling by default
};

const useEdtrStateManager = (): ESM => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const getState: ESM['getState'] = useCallback(() => state, [state]);

	const setVisibleDatetimeIds: ESM['setVisibleDatetimeIds'] = useCallback((visibleDatetimeIds) => {
		dispatch({
			type: 'SET_VISIBLE_DATETIME_IDS',
			visibleDatetimeIds,
		});
	}, []);

	const setPricesPollInterval: ESM['setPricesPollInterval'] = useCallback((pricesPollInterval) => {
		dispatch({
			type: 'SET_PRICES_POLL_INTERVAL',
			pricesPollInterval,
		});
	}, []);

	const stateStr = useMemoStringify(state);
	return useMemo(
		() => ({
			...state,
			getState,
			setVisibleDatetimeIds,
			setPricesPollInterval,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[stateStr]
	);
};

export default useEdtrStateManager;
