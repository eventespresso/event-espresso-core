import React, { useState } from 'react';
import { notification, Spin } from 'antd';
import { ArgsProps, IconType } from 'antd/lib/notification';
import uuidv4 from 'uuid/v4';
import { without } from 'ramda';

import { ToastManagerProps, Toaster } from './types';

const useToastManager = ({ maxToasts = 6, ...toastArgs }: ToastManagerProps): Toaster => {
	// "toastStack" contains the array of keys of open toasts
	const [toastStack, setToastStack] = useState<Array<string>>([]);

	// initial configuration
	notification.config(toastArgs);

	const openToast = (key: string): void => {
		if (maxToasts) {
			closeIfAtLimit();
		}

		// pass a callback to avoid out of date stack
		// due to async state updates
		setToastStack((currentStack) => [...without([key], currentStack), key]);
	};

	const closeToast = (key: string): void => {
		notification.close(key);
		setToastStack((currentStack) => currentStack.filter((toastKey) => toastKey !== key));
	};

	const closeIfAtLimit = (): void => {
		if (toastStack.length === maxToasts) {
			// remove the oldest toast.
			closeToast(toastStack[toastStack.length - 1]);
		}
	};

	const isToastOpen = (key: string): boolean => toastStack.includes(key);

	const getToast = (toastType: IconType | 'loading') => (args: ArgsProps): string => {
		// if no key supplied, generate one
		const key = args.key || uuidv4();

		if (toastType !== 'loading' && !args.message) {
			closeToast(key);
			return key;
		}

		let type: IconType,
			icon: React.ReactNode,
			duration = 4;

		if (toastType === 'loading') {
			icon = <Spin size='small' />;
			type = undefined;
			duration = 0;
		} else {
			type = toastType;
		}

		openToast(key);
		notification.open({
			...args,
			key,
			icon,
			type,
			duration,
			onClose: () => closeToast(key),
		});

		// return the key for reference
		// can be passed to close()
		return key;
	};

	return {
		success: getToast('success'),
		info: getToast('info'),
		warning: getToast('warning'),
		error: getToast('error'),
		loading: getToast('loading'),
		generateKey: uuidv4,
		dismiss: closeToast,
		isToastOpen,
	};
};
export default useToastManager;
