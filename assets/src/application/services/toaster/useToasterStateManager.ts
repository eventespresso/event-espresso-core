import { useCallback, useReducer } from 'react';
import { findIndex, propEq } from 'ramda';

import { toasterStateReducer } from './toasterStateReducer';
import { ToasterActionType, ToastKey, WithAnimationProps, ToasterStateReducer, UseToasterStateManager } from './types';

const useToasterStateManager: UseToasterStateManager = () => {
	const [state, dispatch] = useReducer<ToasterStateReducer>(toasterStateReducer, []);

	/**
	 * adds a new toast to the toaster state
	 */
	const add = useCallback((toast: WithAnimationProps) => dispatch({ type: ToasterActionType.ADD, toast }), []);

	/**
	 * dissmiss an existing toast in the toaster state
	 */
	const dissmiss = useCallback((key: ToastKey) => dispatch({ type: ToasterActionType.DISMISS, key }), []);

	/**
	 * dissmiss ALL existing toasts in the toaster state
	 */
	const dissmissAll = useCallback(() => dispatch({ type: ToasterActionType.DISMISS_ALL }), []);

	/**
	 * returns true if toast is already in the toaster state
	 */
	const exists = useCallback((key: ToastKey) => findIndex(propEq('key', key), state) > 0, [state]);

	/**
	 * remove an existing toast in the toaster state (deletes ir)
	 */
	const remove = useCallback((key: ToastKey) => dispatch({ type: ToasterActionType.REMOVE, key }), []);

	/**
	 * remove ALL existing toasts in the toaster state
	 */
	const removeAll = useCallback(() => dispatch({ type: ToasterActionType.REMOVE_ALL }), []);

	return {
		add,
		dissmiss,
		dissmissAll,
		exists,
		remove,
		removeAll,
		toasterState: state,
	};
};
export default useToasterStateManager;
