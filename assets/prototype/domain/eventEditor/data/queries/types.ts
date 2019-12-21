import { DataProxy } from 'apollo-cache';
import { OperationVariables } from 'apollo-client';

export type ReadQueryOptions<TVariables = OperationVariables> = DataProxy.Query<TVariables>;

export type WriteQueryOptions<TData = any, TVariables = OperationVariables> = DataProxy.WriteQueryOptions<
	TData,
	TVariables
>;
