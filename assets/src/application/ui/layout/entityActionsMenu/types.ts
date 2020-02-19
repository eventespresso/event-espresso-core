import React from 'react';
import { Entity } from '@edtrServices/apollo/types';

export type Domain = 'eventEditor';

export interface SubscriptionData<E, T> {
	entityType: T;
	entity: E;
}

export type EntitySubscriptionCallback<E extends Entity, AO = AdditionalSubscriptionCbOptions> = SubscriptionCallback<
	SubscriptionData<E, AO>
>;

export type EntityActionsMenuCallback<E extends Entity> = (
	entity: E,
	entityActionsManager: EntityActionsManager
) => void;

export interface ActionsMenuComponentProps<E extends Entity> {
	entity: E;
	menuItemProps?: ActionsMenuItemProps;
	[key: string]: any;
}

export interface ActionsMenuItemProps {
	[key: string]: any;
}

export interface EntityActionsManager {
	registerMenuItem: (key: string, component: React.ReactType) => void;
	unRegisterMenuItem: (key: string) => void;
	getMenuItems: () => EntityMenuItems;
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

export type SubscribeFn = (cb: SubscriptionCallback, options?: SubscriptionsOptions) => VoidFunction;

export interface SubscriptionsOptions {
	entityType?: string; // to limit the subscription only to specific entityType
}

export interface Subscription {
	callback: SubscriptionCallback;
	options: SubscriptionsOptions;
}

export type Subscriptions = {
	[key: string]: Subscription;
};

export type SubscriptionCallback<D = any, AO = AdditionalSubscriptionCbOptions> = (
	data: D,
	entityActionsManager: EntityActionsManager,
	additionalOptions?: AO
) => void;

export interface AdditionalSubscriptionCbOptions {
	[key: string]: any;
}

export interface EntityActionsData {
	subscribe: SubscribeFn;
	subscriptions: Subscriptions;
}

export interface EntityActions {
	subscribe: SubscribeFn;
	getSubscriptions: (options?: SubscriptionsOptions) => Subscriptions;
}

export interface UpdateSubscriptionProps {
	id: string;
	callback?: SubscriptionCallback;
	options?: SubscriptionsOptions;
	action?: 'add' | 'remove';
}
