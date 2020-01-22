import { Intent } from '@blueprintjs/core';
import { useCallback } from 'react';

import { SuccessToast } from './types';

const useSuccessToast: SuccessToast = (toaster, hash) =>
	useCallback(
		(message = '', timeout = 2500, action = {}, onDismiss = null) => {
			if (message) {
				toaster.show(
					{
						action,
						intent: Intent.SUCCESS,
						icon: 'tick-circle',
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

export default useSuccessToast;
