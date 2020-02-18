import { useContext } from 'react';

import { ToasterHash, ToasterHook } from './types';
import useDismissToast from './useDismissToast';
import useErrorToast from './useErrorToast';
import useInfoToast from './useInfoToast';
import useLoadingToast from './useLoadingToast';
import useSuccessToast from './useSuccessToast';
import { ToastContext } from '../context/ToastProvider';

const hash: ToasterHash = (message): string => {
	const msg = JSON.stringify(message);
	return msg
		.split('')
		.reduce((a, b) => {
			a = (a << 5) - a + b.charCodeAt(0);
			return a & a;
		}, 0)
		.toString();
};

const useToaster = (): ToasterHook => {
	const toaster = useContext(ToastContext);

	return {
		dismiss: useDismissToast(toaster, hash),
		error: useErrorToast(toaster, hash),
		info: useInfoToast(toaster, hash),
		loading: useLoadingToast(toaster, hash),
		success: useSuccessToast(toaster, hash),
	};
};

export default useToaster;
