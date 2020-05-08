import React, { useCallback } from 'react';
import { toast } from 'react-toastify';

import { Check, CloseCircleOutlined, InfoCircleOutlined } from '@appDisplay/icons/svgs';

import { DissmissToast, SystemNotificationsManager } from './types';
import Loading from './Loading';
import useToaster from './useToaster';

// const position = toast.POSITION.BOTTOM_RIGHT; // got TS error because of this
const position = 'bottom-right';

const Msg = ({ closeToast, icon, message = 'loading...' }) => (
	<div>
		{icon}
		{message}
		<button onClick={closeToast}>Close</button>
	</div>
);

const useSystemNotifications: SystemNotificationsManager = (options?) => {
	const { dissmiss: dissmissToast, dissmissAll, generateKey, getToasts } = useToaster(options);

	const dismiss: DissmissToast = useCallback((toastId) => toast.dismiss(toastId), [dissmissToast]);

	const error = useCallback(({ message }): void => {
		toast(<Msg icon={<CloseCircleOutlined color='rgb(255, 77, 79)' fontSize='1.5rem' />} message={message} />, {
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
		toast(<Msg icon={<Check color='rgb(82, 196, 26)' fontSize='1.5rem' />} message={message} />, {
			position,
		});
	}, []);

	const warning = useCallback(({ message }): void => {
		toast(<Msg icon={<InfoCircleOutlined color='rgb(250, 173, 20)' fontSize='1.5rem' />} message={message} />, {
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
