import React from 'react';
import { MockedProvider } from '@apollo/react-testing';

import { cache } from '@dataServices/apollo/client';
import { CommonProviders } from '../EventEditorContext/ContextProviders';
import { useDomTestData, useResetApolloCache, useSetGlobalStatusFlags, useSetRelationalData } from './';
import { MockedResponse } from './types';

/**
 * A top level provider wrapped by Apollo MockedProvider.
 *
 * @param {ReactElement} children The element that should be wrapped.
 * @returns {ReactElement} The wrapped element.
 */
export const ApolloMockedProvider = (mocks: ReadonlyArray<MockedResponse> = []): React.FC => {
	const Provider: React.FC = ({ children }) => {
		return (
			<MockedProvider mocks={mocks} cache={cache}>
				<ApolloAwareWrapper>{children}</ApolloAwareWrapper>
			</MockedProvider>
		);
	};
	return Provider;
};

/**
 * A mid level provider wrapped by CommonProviders.
 * It sets the DOM data and handles Apollo cache reset.
 *
 * @param {ReactElement} children The element that should be wrapped.
 * @returns {ReactElement} The wrapped element.
 */
export const ApolloAwareWrapper: React.FC = ({ children }) => {
	// initialize DOM data
	useDomTestData();
	// clear Apollo cache on unmount
	useResetApolloCache();
	return (
		<CommonProviders>
			<ContextAwareWrapper>{children}</ContextAwareWrapper>
		</CommonProviders>
	);
};

/**
 * A bottom level provider that's aware of all the contexts.
 * Takes care of the operations that need contexts.
 *
 * @param {ReactElement} children The element that should be wrapped.
 * @returns {ReactElement} The wrapped element.
 */
export const ContextAwareWrapper: React.FC = ({ children }) => {
	useSetGlobalStatusFlags();
	useSetRelationalData();
	return <>{children}</>;
};
