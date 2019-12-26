import { useCallback } from 'react';

const useDismissToast = (toaster, hash) =>
	useCallback(
		(message = '') => {
			const msgHash = hash(message);
			toaster.dismiss(msgHash);
		},
		[toaster, hash]
	);

export default useDismissToast;
