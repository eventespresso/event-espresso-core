import { MutationOptions } from 'apollo-client';
import { DataProxy } from 'apollo-cache';

export type MutationInput = {
	[key: string]: any;
};

export type OnMutationCompletedFn = (data: any) => void;

export type OnMutationErrorFn = (error: Error) => void;

type OnUpdateFnOptions = {
	proxy: DataProxy;
	entity: any;
};

export type OnUpdateFn = (options: OnUpdateFnOptions) => void;

export interface BackwardSubscription {
	onCompleted?: OnMutationCompletedFn;
	onError?: OnMutationErrorFn;
}
export interface EntityMutator {
	createEntity: (input: MutationInput, subscriptions?: BackwardSubscription) => MutationResult;
	updateEntity: (input: MutationInput, subscriptions?: BackwardSubscription) => MutationResult;
	deleteEntity: (input?: MutationInput, subscriptions?: BackwardSubscription) => MutationResult;
}

export interface CustomMutationOptions extends MutationOptions {
	onCompleted?: OnMutationCompletedFn;
	onError?: OnMutationErrorFn;
}

type MutationGetter = (input: MutationInput) => MutationOptions;

export type MutationResult = {
	loading: boolean;
	error?: any;
	data?: any;
	called: boolean;
};

export interface EntityMutation {
	getCreateMutation: MutationGetter;
	getUpdateMutation: MutationGetter;
	getDeleteMutation: MutationGetter;
	mutate: (options: CustomMutationOptions) => MutationResult;
}

export interface Mutators {
	datetimeMutator: Mutator;
	ticketMutator: Mutator;
	priceMutator: Mutator;
}

export interface MutatorGeneratedObject {
	onUpdate?: OnUpdateFn;
	optimisticResponse: any;
	variables: any;
}

export type Mutator = (mutationType: MutationType, input: MutationInput) => MutatorGeneratedObject;

export enum MutationType {
	Create = 'CREATE',
	Update = 'UPDATE',
	Delete = 'DELETE',
}

export enum EntityType {
	Datetime = 'Datetime',
	Ticket = 'Ticket',
	Price = 'Price',
	PriceType = 'PriceType',
}
