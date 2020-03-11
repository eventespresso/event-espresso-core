import React from 'react';
import { Entity } from '@appServices/apollo/types';
import { Subscriptions } from '@appServices/subscription';

export interface SubscriptionsOptions<T extends string> {
	entityType?: T; // to limit the subscription only to specific entityType
}

export interface SubscriptionData<E extends Entity, T extends string> extends SubscriptionsOptions<T> {
	entity: E;
}

export interface EntityActionsService {
	subscribe: SubscribeFn;
	getSubscriptions: <E extends Entity, T extends string>(
		options?: SubscriptionsOptions<T>
	) => Subscriptions<SubscriptionData<E, T>, SubscriptionsOptions<T>>;
}

export type EntityActionsServiceHook = <Domain extends string>(domain: Domain) => EntityActionsService;

export type SubscribeFn = <E extends Entity, T extends string>(
	cb: EntityActionsSubscriptionCb<E, T>,
	options?: SubscriptionsOptions<T>
) => VoidFunction;

export type EntityActionsSubscriptionCb<E extends Entity, T extends string> = (
	data: SubscriptionData<E, T>,
	entityActionsMenu: EntityActionsMenu
) => void;

export interface EntityActionsMenu {
	registerMenuItem: (key: string, component: React.ReactType) => void;
	unRegisterMenuItem: (key: string) => void;
	getMenuItems: () => EntityMenuItems;
}

export interface ActionsMenuComponentProps<E extends Entity> {
	entity: E;
	[key: string]: any;
}

export type EntityMenuItems = {
	[key: string]: React.ReactType;
};

/**
 * e.g.
 * menuRegistry = {
 *     datetime: {
 *         YTBUKTUYRytB: {
 *             editDate: () => null,
 *             assignTickets: () => null,
 *         },
 *     },
 *     ticket: {
 *         KJGNFGHFjhfbY: {
 *             editTicket: () => null,
 *             tpc: () => null,
 *         },
 *     },
 * }
 */
export type MenuRegistry = {
	// entityType e.g. "datetime"
	[key: string]: {
		// entityId
		[key: string]: EntityMenuItems;
	};
};
