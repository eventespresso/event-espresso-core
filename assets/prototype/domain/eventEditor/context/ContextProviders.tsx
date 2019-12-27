import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';
/* Internal dependencies */
import { getClient, cache } from '../../../infrastructure/services/apollo/Apollo';
import { ToastProvider } from '../../../application/services/context/ToastProvider';
import { RelationsProvider } from '../../../application/services/context/RelationsProvider';
import { StatusProvider } from '../../../application/services/context/StatusProvider';
import ConfigProvider from '../../../application/services/context/ConfigProvider';
import { EventEditorEventIdProvider } from './EventEditorEventIdProvider';

/**
 * A collection of top level providers wrapped by ApolloProvider.
 *
 * @param {ReactElement} children The element that should be wrapped.
 * @returns {ReactElement} The wrapped element.
 */
export const ContextProviders = ({ children }) => (
	<ApolloProvider client={getClient()}>
		<CommonProviders>{children}</CommonProviders>
	</ApolloProvider>
);

/**
 * A collection of top level providers that are used by multiple parts of the application.
 * This is also shared by unit tests.
 *
 * @param {ReactElement} children The element that should be wrapped.
 * @returns {ReactElement} The wrapped element.
 */
export const CommonProviders = ({ children }) => (
	<ToastProvider>
		<StatusProvider>
			<ConfigProvider>
				<EventEditorEventIdProvider>
					<RelationsProvider>{children}</RelationsProvider>
				</EventEditorEventIdProvider>
			</ConfigProvider>
		</StatusProvider>
	</ToastProvider>
);

export const ApolloMockedProvider = (mocks: MockedResponse[] = []) => ({ children }) => {
	return (
		<MockedProvider mocks={mocks} cache={cache}>
			<CommonProviders>{children}</CommonProviders>
		</MockedProvider>
	);
};

export default ContextProviders;
