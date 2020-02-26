import { useEffect } from 'react';

import useToaster from './useToaster';
import { LoadingToastProps } from './types';

const useLoadingToast = ({ toastKey, message, loading }: LoadingToastProps): void => {
	const toaster = useToaster();

	useEffect(() => {
		if (loading && !toaster.isToastOpen(toastKey)) {
			toaster.loading({
				key: toastKey,
				message,
			});
		} else if (!loading) {
			toaster.dismiss(toastKey);
		}
	}, [loading]);
};

export default useLoadingToast;
