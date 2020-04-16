import { useCallback } from 'react';
import { filter } from 'ramda';
import { v4 as uuidv4 } from 'uuid';

import useToasterStateManager from './useToasterStateManager';
import {
	AddToast,
	KeyGenerator,
	onCloseFn,
	PositionsType,
	ToastPositions,
	ToastProps,
	UseToaster,
	UseToasterProps,
	WithAnimationProps,
} from './types';

const defaultToastPositions: ToastPositions = {
	'top-left': [],
	top: [],
	'top-right': [],
	'bottom-left': [],
	bottom: [],
	'bottom-right': [],
};

const defaultOptions: UseToasterProps = {
	duration: null,
	isClosable: true,
	position: 'bottom-right',
	toastKeyPrefix: null,
};
const positionsMatch = (position: PositionsType) => (toast: ToastProps): boolean => toast.position === position;

const useToaster: UseToaster = (config) => {
	// merge default options with default usage options (which can still be overridden for each individual toast)
	const options: UseToasterProps = { ...defaultOptions, ...config };

	const { add, dissmiss, dissmissAll, remove, exists, toasterState } = useToasterStateManager();

	const addToast: AddToast = useCallback(
		({ className, duration, isClosable, key, message, onClose, position, title, type }) => {
			const id = generateKey(key, options.toastKeyPrefix);
			console.log(
				'%c addToast (key, id, type, message, position)',
				'color: DarkOrange;',
				key,
				id,
				type,
				message,
				position
			);
			const toast: WithAnimationProps = {
				className,
				duration: typeof duration !== 'undefined' ? duration : options.duration,
				key: id,
				message,
				position: typeof position !== 'undefined' ? position : options.position,
				isClosable: typeof isClosable !== 'undefined' ? isClosable : options.isClosable,
				onClose: onToastClose(onClose, id),
				onRequestRemove: () => remove(id),
				requestClose: false,
				timestamp: Date.now(),
				title,
				type,
			};
			add(toast);
			return toast.key;
		},
		[add, dissmiss, options, remove]
	);

	const generateKey: KeyGenerator = useCallback((key, prefix) => {
		const id = key || uuidv4();
		console.log('%c KeyGenerator', 'color: MediumAquaMarine;', key, prefix, id);
		return prefix ? `${prefix}:${id}` : `${id}`;
	}, []);

	const onToastClose = useCallback(
		(callback: Function, key: string): onCloseFn => (event: React.MouseEvent): void => {
			event.preventDefault();
			if (typeof callback === 'function') {
				callback(key);
			}
			dissmiss(key);
		},
		[dissmiss]
	);

	const getToasts = useCallback((): ToastPositions => {
		const toastPositions = { ...defaultToastPositions };
		for (const position in toastPositions) {
			const matches = positionsMatch(position as PositionsType);
			toastPositions[position] = filter(matches, toasterState);
		}
		return toastPositions;
	}, [toasterState]);

	return {
		addToast,
		dissmiss,
		dissmissAll,
		exists,
		generateKey,
		getToasts,
	};
};
export default useToaster;
