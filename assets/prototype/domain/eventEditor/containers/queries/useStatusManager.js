import { useReducer, useEffect } from '@wordpress/element';
import { pathOr } from 'ramda';

const INITIAL_FLAGS = {
	datetimes: false,
	tickets: false,
	priceTypes: false,
	prices: false,
};

const INITIAL_STATE = {
	loading: INITIAL_FLAGS,
	completed: INITIAL_FLAGS,
	error: INITIAL_FLAGS,
};

const useStatusManager = () => {
	const [state, dispatch] = useReducer(statusReducer, INITIAL_STATE);

	useEffect(() => {
		console.log('useStatusManager >>>', state);
	}, [state]);

	/**
	 * Whether a type (e.g. datetimes) is being loaded.
	 *
	 * @param {string} typeName The plural type name like "datetimes", "tickets", "prices"
	 */
	const isLoading = (typeName) => {
		return pathOr(false, ['loading', typeName], state);
	};

	/**
	 * Set `isLoading` for the type.
	 *
	 * @param {string}  typeName  The plural type name like "datetimes", "tickets", "prices"
	 * @param {boolean} value Value of the flag
	 */
	const setIsLoading = (typeName, value = true) => {
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
	const isLoaded = (typeName) => {
		return pathOr(false, ['completed', typeName], state);
	};

	/**
	 * Set `isLoaded` for the type.
	 *
	 * @param {string} typeName The plural type name like "datetimes", "tickets", "prices"
	 * @param {boolean} value Value of the flag
	 */
	const setIsLoaded = (typeName, value = true) => {
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
	const isError = (typeName) => {
		return pathOr(false, ['error', typeName], state);
	};

	/**
	 * Set `isError` for the type.
	 *
	 * @param {string} type The plural type name like "datetimes", "tickets", "prices"
	 * @param {boolean} value Value of the flag
	 */
	const setIsError = (typeName, value = true) => {
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

const statusReducer = (state, action) => {
	console.log('statusReducer action: ', action);
	const { type, typeName, value } = action;
	let statusKey;
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
