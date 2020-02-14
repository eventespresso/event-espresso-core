import { DataProxy } from 'apollo-cache';
import { OperationVariables } from 'apollo-client';

import { MutationInput, MutationType } from '@appServices/apollo/mutations/types';
import { Entity as BaseEntity, Datetime, DatetimeEdge, Ticket, TicketEdge, Price, PriceEdge } from '../types';

export interface MutationCallbackFnArgs {
	proxy?: DataProxy;
}

/* Datetime specific */
export interface DatetimeMutationCallbackFnArgs extends MutationCallbackFnArgs {
	datetime: Datetime;
	datetimes?: DatetimeEdge;
	tickets?: string[];
}
export type DatetimeMutationCallbackFn = (args: DatetimeMutationCallbackFnArgs) => void;

/* Ticket specific */
export interface TicketMutationCallbackFnArgs extends MutationCallbackFnArgs {
	ticket: Ticket;
	tickets?: TicketEdge;
	datetimeIds?: string[];
	prices?: PriceEdge;
	priceIds?: string[];
}
export type TicketMutationCallbackFn = (args: TicketMutationCallbackFnArgs) => void;

/* Price specific */
export interface PriceMutationCallbackFnArgs extends MutationCallbackFnArgs {
	price: Price;
	prices?: PriceEdge;
	priceTypeId?: string;
	ticketId?: string;
}
export type PriceMutationCallbackFn = (args: PriceMutationCallbackFnArgs) => void;

/* Generic cache updater */
export interface CacheUpdaterFnArgs extends MutationCallbackFnArgs {
	datetimes?: DatetimeEdge;
	datetime?: Datetime;
	tickets?: TicketEdge;
	ticket?: Ticket;
	price?: Price;
	prices?: PriceEdge;
	datetimeIn?: string[];
	datetimeId?: string;
	ticketIn?: string[];
	ticketId?: string;
	remove?: boolean;
}

export type CacheUpdaterFn = (args: CacheUpdaterFnArgs) => void;

export enum TypeName {
	Datetime = 'Datetime',
	Ticket = 'Ticket',
	Price = 'Price',
	PriceType = 'PriceType',
}

export type OnUpdateFnOptions<Entity = BaseEntity> = {
	proxy: DataProxy;
	entity: Entity;
};

export type OnUpdateFn = (options: OnUpdateFnOptions) => void;

export interface MutationHandlers {
	datetimeMutationHandler: MutationHandler;
	ticketMutationHandler: MutationHandler;
	priceMutationHandler: MutationHandler;
}

export interface MutatorGeneratedObject<T = any> {
	onUpdate?: OnUpdateFn;
	optimisticResponse: T;
	variables: OperationVariables;
}

export type MutationHandler = <T = any, MI = MutationInput>(
	mutationType: MutationType,
	input: MI
) => MutatorGeneratedObject<T>;

// merges two types
type Merge<A, B> = Omit<A, keyof B> & B extends infer O ? { [K in keyof O]: O[K] } : never;

export interface MutationInputWithId {
	clientMutationId: string;
}

export interface MutationVariables<MI = MutationInput> {
	input: Merge<MI, MutationInputWithId>;
}
