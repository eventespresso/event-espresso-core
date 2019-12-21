import { DataProxy } from 'apollo-cache';
import { Datetime, DatetimeEdge, Ticket, TicketEdge, Price, PriceEdge } from '../types';

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
