import find from 'ramda/src/find';
import React, { useCallback } from 'react';
import { IToastProps } from '@blueprintjs/core';

import LoadingToastNotice from './LoadingToast';
import { LoadingToast, LoadingToastCallback } from './types';
import useDismissToast from './useDismissToast';

const useLoadingToast: LoadingToast = (toaster, hash) => {
	const dismiss = useDismissToast(toaster, hash);
	return useCallback<LoadingToastCallback>(
		(loading = true, message = 'loading', timeout = 0, action = {}, onDismiss = null) => {
			const isToasting = (msgHash: string): boolean => {
				const toasts = toaster.getToasts();
				return Array.isArray(toasts) && find((t) => t.key && t.key === msgHash, toasts) !== undefined;
			};

			if (message) {
				const msgHash = hash();
				const isLoading = isToasting(msgHash);
				const msgToast = <LoadingToastNotice message={message} />;
				const toastProps: IToastProps = { action, message: msgToast, onDismiss, timeout };
				if (loading && !isLoading) {
					toaster.show(toastProps, msgHash);
				} else if (!loading && isLoading) {
					dismiss(message);
				}
			}
		},
		[dismiss, hash, toaster]
	);
};

export default useLoadingToast;
