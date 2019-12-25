import React, { useCallback } from 'react';
import { Spinner } from '@blueprintjs/core';
import { find } from 'ramda';
import useDismissToast from './useDismissToast';

const useLoadingToast = (toaster, hash) => {
	const dismiss = useDismissToast(toaster, hash);

	return useCallback(
		(loading = true, message = 'loading', timeout = 0, action = {}, onDismiss = null) => {
			const isToasting = (msgHash) => {
				const toasts = toaster.getToasts();
				return Array.isArray(toasts) && find((t) => t.key && t.key === msgHash, toasts);
			};

			if (message) {
				const msgHash = hash(message);
				const isLoading = isToasting(msgHash);
				if (loading && !isLoading) {
					toaster.show(
						{
							action,
							message: (
								<div
									style={{
										display: 'flex',
										flexFlow: 'row nowrap',
										alignContent: 'flex-start',
										justifyContent: 'flex-start',
									}}
								>
									<Spinner size={Spinner.SIZE_SMALL} />
									<span
										style={{
											marginLeft: '1rem',
										}}
									>
										{message}
									</span>
								</div>
							),
							onDismiss,
							timeout,
						},
						msgHash
					);
				} else if (!loading && isLoading) {
					dismiss(message);
				}
			}
		},
		[dismiss, hash, toaster]
	);
};

export default useLoadingToast;
