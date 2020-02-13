import { MutationOptions, OperationVariables } from 'apollo-client';
import { DataProxy } from 'apollo-cache';
import { Entity as AnEntity } from '@edtrServices/apollo/types';

export type MutationInput = {
	[key: string]: any;
};

export type OnMutationCompletedFn = (data: any) => void;

export type OnMutationErrorFn = (error: Error) => void;

export type OnUpdateFnOptions<Entity = AnEntity> = {
	proxy: DataProxy;
	entity: Entity;
};

export type OnUpdateFn = (options: OnUpdateFnOptions) => void;

export interface BackwardSubscription {
	onCompleted?: OnMutationCompletedFn;
	onError?: OnMutationErrorFn;
}

export type EntityMutatorFn = (input: MutationInput, subscriptions?: BackwardSubscription) => MutationResult;
export type EntityMutatorDeleteFn = (input?: MutationInput, subscriptions?: BackwardSubscription) => MutationResult;

export interface EntityMutator {
	createEntity: EntityMutatorFn;
	updateEntity: EntityMutatorFn;
	deleteEntity: EntityMutatorDeleteFn;
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
	mutate: (options: CustomMutationOptions, mutationType: MutationType) => MutationResult;
}

export interface Mutators {
	datetimeMutator: Mutator;
	ticketMutator: Mutator;
	priceMutator: Mutator;
}

export interface MutatorGeneratedObject {
	onUpdate?: OnUpdateFn;
	optimisticResponse: any;
	variables: OperationVariables;
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
