import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
/* Internal dependencies */
import { getClient } from '../../../../../infrastructure/services/apollo/Apollo';
import { ToastProvider } from '../../../../../application/services/context/ToastProvider';
import { RelationsProvider } from '../../../../../application/services/context/RelationsProvider';
import { StatusProvider } from '../../../../../application/services/context/StatusProvider';
import { ModalProvider } from '../../../../../application/services/context/ModalProvider';
import { ConfigProvider } from '../../../../../application/services/context/ConfigProvider';
import { FormModalProvider } from '../../../../../application/services/context/FormModalProvider';
import { EventEditorEventIdProvider } from '../EventContext';
import { ContextProvider } from '../types';

/**
 * A collection of top level providers wrapped by ApolloProvider.
 *
 * @param {ReactElement} children The element that should be wrapped.
 * @returns {ReactElement} The wrapped element.
 */
export const ContextProviders: ContextProvider = ({ children }) => {
	// Make TS (TS2769) friends with ESLint (react/no-children-prop)
	const props = {
		client: getClient(),
		children: null,
	};
	return (
		<ApolloProvider {...props}>
			<CommonProviders>{children}</CommonProviders>
		</ApolloProvider>
	);
};

/**
 * A collection of top level providers that are used by multiple parts of the application.
 * This is also shared by unit tests.
 *
 * @param {ReactElement} children The element that should be wrapped.
 * @returns {ReactElement} The wrapped element.
 */
export const CommonProviders: ContextProvider = ({ children }) => (
	<ToastProvider>
		<StatusProvider>
			<ConfigProvider>
				<EventEditorEventIdProvider>
					<RelationsProvider>
						<FormModalProvider>
							<ModalProvider>{children}</ModalProvider>
						</FormModalProvider>
					</RelationsProvider>
				</EventEditorEventIdProvider>
			</ConfigProvider>
		</StatusProvider>
	</ToastProvider>
);

export default ContextProviders;
