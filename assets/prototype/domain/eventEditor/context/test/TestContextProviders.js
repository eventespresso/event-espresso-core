import React from 'react';
import { MockedProvider } from '@apollo/react-testing';
/* Internal dependencies */
import { cache } from '../../../../infrastructure/services/apollo/Apollo';
import { CommonProviders } from '../ContextProviders';
import { useDomTestData } from './';
import useResetApolloCache from './useResetApolloCache';

export const ApolloMockedProvider = (mocks = []) => ({ children }) => {
	return (
		<MockedProvider mocks={mocks} cache={cache}>
			<DOMTestDataProvider>{children}</DOMTestDataProvider>
		</MockedProvider>
	);
};

export const DOMTestDataProvider = ({ children }) => {
	// initialize DOM data
	useDomTestData();
	// clear Apollo cache on unmount
	useResetApolloCache();
	return <CommonProviders>{children}</CommonProviders>;
};
