import { useCallback } from 'react';

import { DismissToast } from './types';

const useDismissToast: DismissToast = (toaster, hash) =>
	useCallback(
		(message) => {
			const msgHash = hash(message);
			toaster.dismiss(msgHash);
		},
		[toaster, hash]
	);

export default useDismissToast;
