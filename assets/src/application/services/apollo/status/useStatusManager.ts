import { useReducer } from 'react';
import { pathOr } from 'ramda';
import { StatusManager, StatusState, StatusFlags, StatusAction, StatusGetter, StatusSetter, TypeName } from './types';

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
	const isLoading: StatusGetter = (typeName) => {
		return pathOr(false, ['loading', typeName], state);
	};

	/**
	 * Set `isLoading` for the type.
	 *
	 * @param {string}  typeName  The plural type name like "datetimes", "tickets", "prices"
	 * @param {boolean} value Value of the flag
	 */
	const setIsLoading: StatusSetter = (typeName, value = true) => {
		dispatch({
			type: 'SET_IS_LOADING',
			typeName,
			value,
		});
	};

	/**
	 * Whether a type (e.g. datetimes) has been loaded.
	 *
	 * @param {string} typeName The plural type name like "datetimes", "tickets", "prices"
	 */
	const isLoaded: StatusGetter = (typeName) => {
		return pathOr(false, ['completed', typeName], state);
	};

	/**
	 * Set `isLoaded` for the type.
	 *
	 * @param {string} typeName The plural type name like "datetimes", "tickets", "prices"
	 * @param {boolean} value Value of the flag
	 */
	const setIsLoaded: StatusSetter = (typeName: TypeName, value = true): void => {
		dispatch({
			type: 'SET_IS_LOADED',
			typeName,
			value,
		});
	};

	/**
	 * Whether an error occurred while loading the type (e.g. datetimes).
	 *
	 * @param {string} typeName The plural type name like "datetimes", "tickets", "prices"
	 */
	const isError: StatusGetter = (typeName: TypeName): boolean => {
		return pathOr(false, ['error', typeName], state);
	};

	/**
	 * Set `isError` for the type.
	 *
	 * @param {string} typeName The plural type name like "datetimes", "tickets", "prices"
	 * @param {boolean} value Value of the flag
	 */
	const setIsError: StatusSetter = (typeName: TypeName, value = true): void => {
		dispatch({
			type: 'SET_IS_ERROR',
			typeName,
			value,
		});
	};

	return {
		isLoading,
		setIsLoading,
		isLoaded,
		setIsLoaded,
		isError,
		setIsError,
	};
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
