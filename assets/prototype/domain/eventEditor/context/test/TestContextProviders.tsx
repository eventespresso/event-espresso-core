import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
/* Internal dependencies */
import { cache } from '../../../../infrastructure/services/apollo/Apollo';
import { CommonProviders } from '../ContextProviders';
import { useDomTestData } from './';
import useResetApolloCache from './useResetApolloCache';
import useSetGlobalStatusFlags from './useSetGlobalStatusFlags';
import useSetRelationalData from './useSetRelationalData';
import { MockedResponse } from './types';
import { ContextProvider } from '../types';

/**
 * A top level provider wrapped by Apollo MockedProvider.
 *
 * @param {ReactElement} children The element that should be wrapped.
 * @returns {ReactElement} The wrapped element.
 */
export const ApolloMockedProvider = (mocks: ReadonlyArray<MockedResponse> = []): ContextProvider => ({
	children,
}): JSX.Element => {
	return (
		<MockedProvider mocks={mocks} cache={cache}>
			<ApolloAwareWrapper>{children}</ApolloAwareWrapper>
		</MockedProvider>
	);
};

/**
 * A mid level provider wrapped by CommonProviders.
 * It sets the DOM data and handles Apollo cache reset.
 *
 * @param {ReactElement} children The element that should be wrapped.
 * @returns {ReactElement} The wrapped element.
 */
export const ApolloAwareWrapper: ContextProvider = ({ children }): JSX.Element => {
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
export const ContextAwareWrapper: ContextProvider = ({ children }): JSX.Element => {
	useSetGlobalStatusFlags();
	useSetRelationalData();
	return <>{children}</>;
};
