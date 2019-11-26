import { ApolloError } from 'apollo-client';
import { Intent } from '@blueprintjs/core';
import { useCallback } from '@wordpress/element';
import IconGraphQL from './IconGraphQL';

const useErrorToast = (toaster, hash) =>
	useCallback(
		(message, timeout = 5000, action = {}, onDismiss = null) => {
			let icon = 'warning-sign';
			let errorMessage = message;
			if (message instanceof ApolloError) {
				errorMessage = message.message;
				if (message.graphQLErrors) {
					icon = <IconGraphQL />;
				} else if (message.networkError) {
					icon = 'globe-network';
				} else {
					icon = 'layout-auto';
				}
			}
			if (errorMessage) {
				toaster.show(
					{
						action,
						icon,
						intent: Intent.DANGER,
						message: errorMessage,
						onDismiss,
						timeout
					},
					hash(errorMessage)
				);
			}
		},
		[toaster, hash]
	);

export default useErrorToast;
