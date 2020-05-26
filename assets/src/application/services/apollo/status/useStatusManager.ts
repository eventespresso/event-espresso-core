import { useCallback, useMemo, useReducer } from 'react';
import { pathOr } from 'ramda';
import type { StatusManager, StatusState, StatusFlags, StatusAction, StatusGetter, StatusSetter } from './types';

const INITIAL_FLAGS: StatusFlags = {
	datetimes: false,
	tickets: false,
	priceTypes: false,
	prices: false,
};

const INITIAL_STATE: StatusState = {
	loading: INITIAL_FLAGS,
	completed: INITIAL_FLAGS,
	error: INITIAL_FLAGS,
};

const useStatusManager = (): StatusManager => {
	const [state, dispatch] = useReducer(statusReducer, INITIAL_STATE);

	/**
	 * Whether a type (e.g. datetimes) is being loaded.
	 *
	 * @param {string} typeName The plural type name like "datetimes", "tickets", "prices"
	 */
	const isLoading: StatusGetter = useCallback((typeName) => pathOr(false, ['loading', typeName], state), [state]);

	/**
	 * Set `isLoading` for the type.
	 *
	 * @param {string}  typeName  The plural type name like "datetimes", "tickets", "prices"
	 * @param {boolean} value Value of the flag
	 */
	const setIsLoading: StatusSetter = useCallback((typeName, value = true) => {
		dispatch({
			type: 'SET_IS_LOADING',
			typeName,
			value,
		});
	}, []);

	/**
	 * Whether a type (e.g. datetimes) has been loaded.
	 *
	 * @param {string} typeName The plural type name like "datetimes", "tickets", "prices"
	 */
	const isLoaded: StatusGetter = useCallback((typeName) => pathOr(false, ['completed', typeName], state), [state]);

	/**
	 * Set `isLoaded` for the type.
	 *
	 * @param {string} typeName The plural type name like "datetimes", "tickets", "prices"
	 * @param {boolean} value Value of the flag
	 */
	const setIsLoaded: StatusSetter = useCallback((typeName, value = true) => {
		dispatch({
			type: 'SET_IS_LOADED',
			typeName,
			value,
		});
	}, []);

	/**
	 * Whether an error occurred while loading the type (e.g. datetimes).
	 *
	 * @param {string} typeName The plural type name like "datetimes", "tickets", "prices"
	 */
	const isError: StatusGetter = useCallback((typeName) => pathOr(false, ['error', typeName], state), [state]);

	/**
	 * Set `isError` for the type.
	 *
	 * @param {string} typeName The plural type name like "datetimes", "tickets", "prices"
	 * @param {boolean} value Value of the flag
	 */
	const setIsError: StatusSetter = useCallback((typeName, value = true) => {
		dispatch({
			type: 'SET_IS_ERROR',
			typeName,
			value,
		});
	}, []);

	return useMemo(
		() => ({
			isLoading,
			setIsLoading,
			isLoaded,
			setIsLoaded,
			isError,
			setIsError,
		}),
		[isError, isLoaded, isLoading, setIsError, setIsLoaded, setIsLoading]
	);
};

const statusReducer = (state: StatusState, action: StatusAction): StatusState => {
	const { type, typeName, value } = action;
	let statusKey: string;
	switch (type) {
		case 'SET_IS_LOADING':
			statusKey = 'loading';
			break;
		case 'SET_IS_LOADED':
			statusKey = 'completed';
			break;
		case 'SET_IS_ERROR':
			statusKey = 'error';
			break;

		default:
			throw new Error();
	}

	/**
	 * For example
	 * {
	 *     ...state,
	 *     loading: {
	 *         ...state.loading,
	 *            tickets: true,
	 *     },
	 * }
	 */

	return {
		...state,
		[statusKey]: {
			...state[statusKey],
			[typeName]: value,
		},
	};
};

export default useStatusManager;
