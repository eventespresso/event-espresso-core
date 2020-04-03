import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import { getClient } from '../../../../../infrastructure/services/apollo/Apollo';
import { ToastProvider } from '../../../../../application/services/context/ToastProvider';
import { RelationsProvider } from '../../../../../application/services/context/RelationsProvider';
import { StatusProvider } from '../../../../../application/services/context/StatusProvider';
import { ModalProvider } from '../../../../../application/services/context/ModalProvider';
import { ConfigProvider } from '../../../../../application/services/context/ConfigProvider';
import { FormModalProvider } from '../../../../../application/services/context/FormModalProvider';
import { EventIdProvider } from '../EventContext';
import { EdtrStateProvider } from '../EdtrStateContext';

/**
 * A collection of top level providers wrapped by ApolloProvider.
 *
 * @param {ReactElement} children The element that should be wrapped.
 * @returns {ReactElement} The wrapped element.
 */
export const ContextProviders: React.FC = ({ children }) => {
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
export const CommonProviders: React.FC = ({ children }) => (
	<ToastProvider>
		<StatusProvider>
			<ConfigProvider>
				<EventIdProvider>
					<RelationsProvider>
						<FormModalProvider>
							<ModalProvider>
								<EdtrStateProvider>{children}</EdtrStateProvider>
							</ModalProvider>
						</FormModalProvider>
					</RelationsProvider>
				</EventIdProvider>
			</ConfigProvider>
		</StatusProvider>
	</ToastProvider>
);

export default ContextProviders;
