import React from 'react';
import { Entity } from '@appServices/apollo/types';

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

export type SubscribeFn = <E extends Entity, T extends string>(
	cb: SubscriptionCallback<E, T>,
	options?: SubscriptionsOptions<T>
) => VoidFunction;

export type SubscriptionCallback<E extends Entity, T extends string> = (
	data: SubscriptionData<E, T>,
	entityActionsManager: EntityActionsManager
) => void;

export interface SubscriptionData<E, T> {
	entityType: T;
	entity: E;
}

export interface EntityActionsManager {
	registerMenuItem: (key: string, component: React.ReactType) => void;
	unRegisterMenuItem: (key: string) => void;
	getMenuItems: () => EntityMenuItems;
}

export type EntityMenuItems = {
	[key: string]: React.ReactType;
};

export interface SubscriptionsOptions<T extends string> {
	entityType?: T; // to limit the subscription only to specific entityType
}

export interface Subscription<E extends Entity, T extends string> {
	callback: SubscriptionCallback<E, T>;
	options: SubscriptionsOptions<T>;
}

export type Subscriptions<E extends Entity, T extends string> = {
	[key: string]: Subscription<E, T>;
};

export interface EntityActionsData {
	subscribe: SubscribeFn;
	subscriptions: Subscriptions<any, string>;
}

export interface EntityActions {
	subscribe: SubscribeFn;
	getSubscriptions: <E extends Entity, T extends string>(options?: SubscriptionsOptions<T>) => Subscriptions<E, T>;
}

export interface UpdateSubscriptionProps {
	id: string;
	callback?: SubscriptionCallback<any, string>;
	options?: SubscriptionsOptions<string>;
	action?: 'add' | 'remove';
}

export interface ActionsMenuComponentProps<E extends Entity> {
	entity: E;
	[key: string]: any;
}
