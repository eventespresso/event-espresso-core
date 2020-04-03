import { useCallback, useMemo, useReducer } from 'react';

import { EdtrState, EdtrStateManager } from './types';
import reducer from './reducer';

// create shorter alias to use at multiple places.
type ESM = EdtrStateManager;

const initialState: EdtrState = {
	visibleDatetimeIds: [],
};

const useEdtrStateManager = (): ESM => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const getState: ESM['getState'] = useCallback(() => state, Object.values(state));

	const setVisibleDatetimeIds: ESM['setVisibleDatetimeIds'] = useCallback((visibleDatetimeIds) => {
		dispatch({
			type: 'SET_VISIBLE_DATETIME_IDS',
			visibleDatetimeIds,
		});
	}, []);

	return useMemo(
		() => ({
			...state,
			getState,
			setVisibleDatetimeIds,
		}),
		Object.values(state)
	);
};

export default useEdtrStateManager;
