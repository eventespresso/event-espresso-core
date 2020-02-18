import { useCallback } from 'react';

import { DismissToast, DismissToastCallback } from './types';

const useDismissToast: DismissToast = (toaster, hash) =>
	useCallback<DismissToastCallback>(
		(message) => {
			const msgHash = hash();
			toaster.dismiss(msgHash);
		},
		[toaster, hash]
	);

export default useDismissToast;
