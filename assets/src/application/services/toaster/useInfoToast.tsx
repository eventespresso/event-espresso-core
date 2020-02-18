import { Intent } from '@blueprintjs/core';
import { useCallback } from 'react';

import { InfoToast, InfoToastCallback } from './types';

const useInfoToast: InfoToast = (toaster, hash) =>
	useCallback<InfoToastCallback>(
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
					hash()
				);
			}
		},
		[toaster, hash]
	);

export default useInfoToast;
