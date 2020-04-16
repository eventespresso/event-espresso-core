import { useCallback } from 'react';

// import useLoadingToast from './useLoadingToast';
import useToaster from './useToaster';
import { AddToast, DissmissToast, SystemNotificationsManager, TOAST_STATUS } from './types';

const useSystemNotificationsManager: SystemNotificationsManager = (options?) => {
	const { addToast, dissmiss: dissmissToast, dissmissAll, exists, generateKey, getToasts } = useToaster(options);

	const dismiss: DissmissToast = useCallback((key) => dissmissToast(key), [dissmissToast]);

	const error: AddToast = useCallback(
		({ key, ...props }): string => {
			return key && exists(key) ? key : addToast({ ...props, type: TOAST_STATUS.ERROR });
		},
		[addToast]
	);

	const info: AddToast = useCallback(
		({ key, ...props }): string => {
			return key && exists(key) ? key : addToast({ ...props, type: TOAST_STATUS.INFO });
		},
		[addToast]
	);

	const loading = useCallback(
		({ key, loading, ...props }): string => {
			if (loading) {
				return key && exists(key) ? key : addToast({ ...props, type: TOAST_STATUS.LOADING });
			}
			if (key) {
				dissmissToast(key);
			}
		},
		[addToast, dissmissToast]
	);

	const success: AddToast = useCallback(
		({ duration = 30000, key, ...props }): string => {
			return key && exists(key) ? key : addToast({ ...props, duration, type: TOAST_STATUS.SUCCESS });
		},
		[addToast]
	);

	const warning: AddToast = useCallback(
		({ key, ...props }): string => {
			return key && exists(key) ? key : addToast({ ...props, type: TOAST_STATUS.WARNING });
		},
		[addToast]
	);

	return {
		dismiss,
		dissmissAll,
		error,
		generateKey,
		info,
		loading,
		getToasts,
		success,
		warning,
	};
};
export default useSystemNotificationsManager;
