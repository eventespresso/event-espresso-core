import { ResultFunction, MockedResponse as ApolloMockedResponse } from '@apollo/react-testing';
import { ExecutionResult } from 'graphql';

export interface MockedResponse extends ApolloMockedResponse {
	result?: ExecutionResult;
	newData?: ResultFunction<ExecutionResult>;
}
