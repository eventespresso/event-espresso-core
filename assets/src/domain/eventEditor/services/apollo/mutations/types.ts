import { DataProxy } from 'apollo-cache';
import { OperationVariables, MutationUpdaterFn } from 'apollo-client';
import { ExecutionResult } from '@apollo/react-common';

import { MutationInput, MutationType } from '@appServices/apollo/mutations/types';
import { Entity as BaseEntity, Entity } from '@dataServices/types';
import { Datetime, DatetimeEdge, Ticket, TicketEdge, Price, PriceEdge } from '../types';
import { Merge } from '@application/services/utilities/types';

export interface MutationCallbackFnArgs {
	proxy?: DataProxy;
}

interface CommonArgs {
	deletePermanently?: boolean;
}

/* Datetime specific */
export interface DatetimeMutationCallbackFnArgs extends MutationCallbackFnArgs, CommonArgs {
	datetime: Datetime;
	datetimes?: DatetimeEdge;
	tickets?: string[];
}
export type DatetimeMutationCallbackFn = (args: DatetimeMutationCallbackFnArgs) => void;

/* Ticket specific */
export interface TicketMutationCallbackFnArgs extends MutationCallbackFnArgs, CommonArgs {
	ticket: Ticket;
	tickets?: TicketEdge;
	datetimeIds?: string[];
	prices?: PriceEdge;
	priceIds?: string[];
}
export type TicketMutationCallbackFn = (args: TicketMutationCallbackFnArgs) => void;

/* Price specific */
export interface PriceMutationCallbackFnArgs extends MutationCallbackFnArgs, CommonArgs {
	price: Price;
	prices?: PriceEdge;
	priceTypeId?: string;
	ticketId?: string;
}
export type PriceMutationCallbackFn = (args: PriceMutationCallbackFnArgs) => void;

/* Generic cache updater */
export interface CacheUpdaterFnArgs extends MutationCallbackFnArgs {
	action: 'add' | 'update' | 'remove';
	datetime?: Datetime;
	datetimeId?: string;
	datetimeIn?: string[];
	datetimes?: DatetimeEdge;
	price?: Price;
	prices?: PriceEdge;
	ticket?: Ticket;
	ticketIn?: string[];
	tickets?: TicketEdge;
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

export interface MutationInputWithId {
	clientMutationId: string;
}

export interface MutationVariables<MI = MutationInput> {
	input: Merge<MI, MutationInputWithId>;
}
/*********************************/
export type MutationFunction<TData = any, TVariables = OperationVariables> = (
	input?: TVariables
) => Promise<ExecutionResult<TData>>;

export interface MutationBaseProps<MI extends MutationInput = MutationInput> {
	input: MI;
	mutationType: MutationType;
}

export interface MutationUpdaterArgs<E extends Entity, MI extends MutationInput = MutationInput>
	extends MutationBaseProps<MI> {
	proxy: DataProxy;
	entity: E;
}

export type MutationUpdater<E extends Entity, MI extends MutationInput = MutationInput> = (
	args: MutationUpdaterArgs<E, MI>
) => void;

export type MutationHandler<E extends Entity, MI extends MutationInput = MutationInput> = (
	mutationType: MutationType,
	input: MI
) => MutatorGeneratedObject<E, MI>;

export interface MutatorGeneratedObject<E extends Entity, MI extends MutationInput = MutationInput> {
	onUpdate?: MutationUpdater<E, MI>;
	optimisticResponse?: any;
	variables: OperationVariables;
}

export interface UpdaterCallbackArgs<E extends Entity, MI extends MutationInput = MutationInput>
	extends MutationBaseProps<MI> {
	onUpdate?: MutationUpdater<E, MI>;
}

export type UpdaterCallback = <E extends Entity, MI extends MutationInput = MutationInput>(
	args: UpdaterCallbackArgs<E, MI>
) => MutationUpdaterFn;
