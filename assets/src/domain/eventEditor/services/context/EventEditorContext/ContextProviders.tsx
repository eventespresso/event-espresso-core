import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import { getClient } from '../../../../../infrastructure/services/apollo/Apollo';
import { ToastProvider } from '@appServices/context/ToastProvider';
import { RelationsProvider } from '@appServices/context/RelationsProvider';
import { StatusProvider } from '@appServices/context/StatusProvider';
import { ConfigProvider } from '@appServices/context/ConfigProvider';
import { FormModalProvider } from '@appServices/context/FormModalProvider';
import { ThemeProvider } from '@appServices/theme';
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
	<ThemeProvider>
		<ToastProvider>
			<StatusProvider>
				<ConfigProvider>
					<EventIdProvider>
						<RelationsProvider>
							<FormModalProvider>
								<EdtrStateProvider>{children}</EdtrStateProvider>
							</FormModalProvider>
						</RelationsProvider>
					</EventIdProvider>
				</ConfigProvider>
			</StatusProvider>
		</ToastProvider>
	</ThemeProvider>
);

export default ContextProviders;
