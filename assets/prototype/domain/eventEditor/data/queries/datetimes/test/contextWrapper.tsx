import React from 'react';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { CommonProviders } from '../../../../context/ContextProviders';
import { cache } from '../../../../../../infrastructure/services/apollo/Apollo';

const contextWrapper = (mocks: MockedResponse[] = []) => ({ children }) => {
	return (
		<MockedProvider mocks={mocks} cache={cache}>
			<CommonProviders>{children}</CommonProviders>
		</MockedProvider>
	);
};

export default contextWrapper;
