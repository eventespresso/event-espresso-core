import { DataProxy } from 'apollo-cache';
import { OperationVariables } from 'apollo-client';

import { MutationInput, MutationType } from '@appServices/apollo/mutations/types';
import { Entity as BaseEntity } from '@appServices/apollo/types';
import { Datetime, DatetimeEdge, Ticket, TicketEdge, Price, PriceEdge } from '../types';
import { Merge } from '@application/services/utilities/types';

export interface MutationCallbackFnArgs {
	proxy?: DataProxy;
}

interface CommponArgs {
	deletePermanently?: boolean;
}

/* Datetime specific */
export interface DatetimeMutationCallbackFnArgs extends MutationCallbackFnArgs, CommponArgs {
	datetime: Datetime;
	datetimes?: DatetimeEdge;
	tickets?: string[];
}
export type DatetimeMutationCallbackFn = (args: DatetimeMutationCallbackFnArgs) => void;

/* Ticket specific */
export interface TicketMutationCallbackFnArgs extends MutationCallbackFnArgs, CommponArgs {
	ticket: Ticket;
	tickets?: TicketEdge;
	datetimeIds?: string[];
	prices?: PriceEdge;
	priceIds?: string[];
}
export type TicketMutationCallbackFn = (args: TicketMutationCallbackFnArgs) => void;

/* Price specific */
export interface PriceMutationCallbackFnArgs extends MutationCallbackFnArgs, CommponArgs {
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
	ticketId?: string;
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

export interface MutationHandlers {
	datetimeMutationHandler: MutationHandler;
	ticketMutationHandler: MutationHandler;
	priceMutationHandler: MutationHandler;
}

export interface MutatorGeneratedObject {
	onUpdate?: OnUpdateFn;
	optimisticResponse: any;
	variables: OperationVariables;
}

export type MutationHandler = <MI extends MutationInput = MutationInput>(
	mutationType: MutationType,
	input: MI
) => MutatorGeneratedObject;

export interface MutationInputWithId {
	clientMutationId: string;
}

export interface MutationVariables<MI = MutationInput> {
	input: Merge<MI, MutationInputWithId>;
}
