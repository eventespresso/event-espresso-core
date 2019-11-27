import { Intent } from '@blueprintjs/core';
import { useCallback } from '@wordpress/element';

const useInfoToast = (toaster, hash) =>
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
