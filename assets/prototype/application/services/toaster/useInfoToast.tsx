import { Intent } from '@blueprintjs/core';
import { useCallback } from 'react';

import { InfoToast } from './types';

const useInfoToast: InfoToast = (toaster, hash) =>
	useCallback(
		(message, timeout = 10000, action = {}, onDismiss = null) => {
			if (message) {
				toaster.show(
					{
						action,
						icon: 'info-sign',
						intent: Intent.PRIMARY,
						message,
						onDismiss,
						timeout,
					},
					hash(message)
				);
			}
		},
		[toaster, hash]
	);

export default useInfoToast;
