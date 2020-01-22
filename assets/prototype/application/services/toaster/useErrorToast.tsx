import React, { useCallback } from 'react';
import { ApolloError } from 'apollo-client';
import { Intent } from '@blueprintjs/core';

import IconGraphQL from './IconGraphQL';
import { ErrorIcon, ErrorToast, ToasterMsg } from './types';

const useErrorToast: ErrorToast = (toaster, hash) =>
	useCallback(
		(message, timeout = 5000, action = {}, onDismiss = null) => {
			let icon: ErrorIcon = 'warning-sign';
			let errorMessage: ToasterMsg;
			if (message instanceof ApolloError) {
				errorMessage = message.message;
				if (message.graphQLErrors) {
					icon = <IconGraphQL />;
				} else if (message.networkError) {
					icon = 'globe-network';
				} else {
					icon = 'layout-auto';
				}
			} else {
				errorMessage = message;
			}
			if (errorMessage) {
				toaster.show(
					{
						action,
						icon,
						intent: Intent.DANGER,
						message: errorMessage,
						onDismiss,
						timeout,
					},
					hash(errorMessage)
				);
			}
		},
		[toaster, hash]
	);

export default useErrorToast;
