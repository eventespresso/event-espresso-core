import { useContext } from '@wordpress/element';
import { ToastContext } from '../contextProviders/ToastProvider';
import useDismissToast from './useDismissToast';
import useErrorToast from './useErrorToast';
import useInfoToast from './useInfoToast';
import useLoadingToast from './useLoadingToast';
import useSuccessToast from './useSuccessToast';

const hash = (message) => {
	const msg = JSON.stringify(message);
	return msg.split('').reduce((a, b) => {
		a = (a << 5) - a + b.charCodeAt(0);
		return a & a;
	}, 0);
};

const useToaster = () => {
	const toaster = useContext(ToastContext);
	return {
		dismiss: useDismissToast(toaster, hash),
		error: useErrorToast(toaster, hash),
		info: useInfoToast(toaster, hash),
		loading: useLoadingToast(toaster, hash),
		success: useSuccessToast(toaster, hash)
	};
};

export default useToaster;
