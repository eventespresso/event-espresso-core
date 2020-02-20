import { useContext } from 'react';
import uuidv4 from 'uuid/v4';
import { ToasterHook } from './types';
import useDismissToast from './useDismissToast';
import useErrorToast from './useErrorToast';
import useInfoToast from './useInfoToast';
import useLoadingToast from './useLoadingToast';
import useSuccessToast from './useSuccessToast';
import useWarningToast from './useWarningToast';

import { ToastContext } from '../context/ToastProvider';

const useToaster = (): ToasterHook => {
	const toaster = useContext(ToastContext);
	const hash = (): string => uuidv4();

	return {
		dismiss: useDismissToast(toaster, hash),
		error: useErrorToast(toaster, hash),
		info: useInfoToast(toaster, hash),
		loading: useLoadingToast(toaster, hash),
		success: useSuccessToast(toaster, hash),
		warning: useWarningToast(toaster, hash),
	};
};

export default useToaster;
