import React from 'react';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { CommonProviders } from '../../../../context/ContextProviders';

const contextWrapper = (mocks: MockedResponse[]) => ({ children }) => {
	return (
		<MockedProvider mocks={mocks}>
			<CommonProviders>{children}</CommonProviders>
		</MockedProvider>
	);
};

export default contextWrapper;
