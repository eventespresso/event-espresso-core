import { useCallback, useMemo, useReducer } from 'react';

import { DataStateManager, DataStateManagerHook } from './types';
import useDataReducer, { initialState } from './useDataReducer';
import useInitialState from './useInitialState';

type DSM = DataStateManager;

const useDataStateManager: DataStateManagerHook = (props) => {
	const initializer = useInitialState(props);
	const dataReducer = useDataReducer(initializer);
	const [state, dispatch] = useReducer(dataReducer, initialState, initializer);

	const getData: DSM['getData'] = useCallback(() => state, [state]);

	const toggleCalcDir: DSM['toggleCalcDir'] = useCallback(() => {
		dispatch({
			type: 'TOGGLE_CALC_DIR',
		});
	}, [dispatch]);

	const updateTicketPrice: DSM['updateTicketPrice'] = useCallback(
		(ticketPrice) => {
			dispatch({
				type: 'UPDATE_TICKET_PRICE',
				ticketPrice,
			});
		},
		[dispatch]
	);

	const setPrices: DSM['setPrices'] = useCallback(
		(prices) => {
			dispatch({
				type: 'SET_PRICES',
				prices,
			});
		},
		[dispatch]
	);

	const addPrice: DSM['addPrice'] = useCallback(
		(price, index) => {
			dispatch({
				type: 'ADD_PRICE',
				index,
				price,
			});
		},
		[dispatch]
	);

	const updatePrice: DSM['updatePrice'] = useCallback(
		({ id, fieldValues }) => {
			dispatch({
				type: 'UPDATE_PRICE',
				id,
				fieldValues,
			});
		},
		[dispatch]
	);

	const deletePrice: DSM['deletePrice'] = useCallback(
		(id, isNew) => {
			if (!isNew) {
				dispatch({
					type: 'ADD_PRICE_TO_DELETED',
					id,
				});
			}
			dispatch({
				type: 'DELETE_PRICE',
				id,
			});
		},
		[dispatch]
	);

	const reset: DSM['reset'] = useCallback(() => {
		dispatch({
			type: 'RESET',
		});
	}, [dispatch]);

	const reverseCalculate: boolean = useMemo(() => Boolean(state.ticket?.reverseCalculate), [
		state.ticket?.reverseCalculate,
	]);

	return {
		...state,
		addPrice,
		deletePrice,
		getData,
		reset,
		reverseCalculate,
		setPrices,
		toggleCalcDir,
		updatePrice,
		updateTicketPrice,
	};
};

export default useDataStateManager;
