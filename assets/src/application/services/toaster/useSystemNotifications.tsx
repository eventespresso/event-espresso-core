import React, { useCallback } from 'react';
import { toast } from 'react-toastify';

import Loading from './Loading';

import useToaster from './useToaster';
import { DissmissToast, SystemNotificationsManager } from './types';

// const position = toast.POSITION.BOTTOM_RIGHT; // got TS error because of this
const position = 'bottom-right';

const Msg = ({ closeToast, message = 'loading...' }) => (
	<div>
		{message}
		<button>Retry</button>
		<button onClick={closeToast}>Close</button>
	</div>
);

const useSystemNotifications: SystemNotificationsManager = (options?) => {
	const { dissmiss: dissmissToast, dissmissAll, generateKey, getToasts } = useToaster(options);

	const dismiss: DissmissToast = useCallback((toastId) => toast.dismiss(toastId), [dissmissToast]);

	const error = useCallback(({ message }): void => {
		toast.error(message, {
			position,
		});
	}, []);

	const info = useCallback(({ message }): void => {
		toast(<Msg message={message} />, {
			position,
		});
	}, []);

	// const loading = useCallback(
	// 	({ key, loading, ...props }): string => {
	// 		if (loading) {
	// 			return key && exists(key) ? key : addToast({ ...props, type: TOAST_STATUS.LOADING });
	// 		}
	// 		if (key) {
	// 			dissmissToast(key);
	// 			return 'dissmissed';
	// 		}
	// 		return 'loading...';
	// 	},
	// 	[addToast, dissmissToast]
	// );

	const loading = useCallback(({ key: toastId, loading, message }): void => {
		toast(<Loading loading={loading} message={message} toastId={toastId} />, {
			position,
			toastId,
		});
	}, []);

	const success = useCallback(({ message }): void => {
		toast.success(message, {
			position,
		});
	}, []);

	const warning = useCallback(({ message }): void => {
		toast.warn(message, {
			position,
		});
	}, []);

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
export default useSystemNotifications;
