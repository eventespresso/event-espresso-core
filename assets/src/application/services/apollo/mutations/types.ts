import { MutationOptions } from 'apollo-client';
import { Entity as BaseType } from '../../../../data/services/types';

export type MutationOptionsCb = <Type extends BaseType, MI = MutationInput>(
	mutationType: MutationType,
	input: MI
) => MutationOptions<Type>;

export type Mutator = (getMutationOptions: MutationOptionsCb) => MutatorCallback;
export type MutatorCallback = <Name extends string, Type extends BaseType>(
	typeName: Name,
	id?: string
) => MutatorObject;
export interface MutatorObject {
	createEntity: MutatorFn;
	updateEntity: MutatorFn;
	deleteEntity: MutatorFn;
}

export type MutationHandler = (getMutationOptions: MutationOptionsCb) => MutationHandlerCallback;
export type MutationHandlerCallback = <Name extends string>(typeName: Name, id?: string) => MutationHandlerObject;
export type MutationGetter = <Type extends BaseType, MI = MutationInput>(input: MI) => MutationOptions<Type>;
export interface MutationHandlerObject {
	getCreateMutation: MutationGetter;
	getUpdateMutation: MutationGetter;
	getDeleteMutation: MutationGetter;
	mutate: (options: CustomMutationOptions, mutationType: MutationType) => MutationResult;
}

export interface MutationInput {
	[key: string]: any;
}

export type OnMutationCompletedFn<DShape = any> = (data: DShape) => void;

export type OnMutationErrorFn = (error: Error) => void;

// These are backward subscriptions towards components
// i.e. when a component wants to be notified
export interface BackwardSubscription<DShape = any> {
	onCompleted?: OnMutationCompletedFn<DShape>;
	onError?: OnMutationErrorFn;
}

export type MutatorFn = <MI = MutationInput, DShape = any>(
	input: MI,
	subscriptions?: BackwardSubscription<DShape>
) => MutationResult<DShape>;

export type MutatorFnGn<MI = MutationInput, DShape = any> = (
	input: MI,
	subscriptions?: BackwardSubscription<DShape>
) => MutationResult<DShape>;

// These are forward subscriptions towards mutators
// i.e. when an entity mutation handler wants to be notified
export interface CustomMutationOptions extends MutationOptions {
	onCompleted?: OnMutationCompletedFn;
	onError?: OnMutationErrorFn;
}

export type MutationResult<D = any> = {
	loading: boolean;
	error?: Error;
	data?: D;
	called: boolean;
};

export enum MutationType {
	Create = 'CREATE',
	Update = 'UPDATE',
	Delete = 'DELETE',
}
