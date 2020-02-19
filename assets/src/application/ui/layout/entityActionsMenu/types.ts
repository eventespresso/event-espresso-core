import React from 'react';
import { Entity } from '@edtrServices/apollo/types';

// export type EntityType = 'datetime' | 'ticket';

// export type DateMenuKey = 'editDate' | 'deleteTicket' | 'assignTickets';

// export type TicketMenuKey = 'editTicket' | 'deleteTicket' | 'assignDates' | 'tpc';

export type EntityType = string;
export type Domain = 'eventEditor';
export type MenuKey = string;

export interface SubscriptionData<E, T> {
	entityType: T;
	entity: E;
}

export type EntitySubscriptionCallback<
	E extends Entity,
	EntityType extends string,
	MenuKey extends string,
	AO = AdditionalSubscriptionCbOptions
> = SubscriptionCallback<MenuKey, SubscriptionData<E, EntityType>, AO>;

export type EntityActionsMenuCallback<E extends Entity, MenuKey extends string> = (
	entity: E,
	entityActionsManager: EntityActionsManager<MenuKey>
) => void;

export interface ActionsMenuComponentProps<E extends Entity> {
	entity: E;
	menuItemProps?: ActionsMenuItemProps;
	[key: string]: any;
}

export interface ActionsMenuItemProps {
	[key: string]: any;
}

export interface EntityActionsManager<MenuKey extends string> {
	registerMenuItem: (key: MenuKey, component: React.ReactType) => void;
	unRegisterMenuItem: (key: MenuKey) => void;
	getMenuItems: () => EntityMenuItems<MenuKey>;
}

export type EntityMenuItems<MenuKey extends string> = {
	// menuKey: component
	[K in MenuKey]?: React.ReactType;
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
export type MenuRegistry<EntityType extends string = '', MenuKey extends string = ''> = {
	// entityType e.g. "datetime"
	[K in EntityType]?: {
		// entityId
		[key: string]: EntityMenuItems<MenuKey>;
	};
};

export type SubscribeFn<EntityType extends string, MenuKey extends string> = (
	cb: SubscriptionCallback<MenuKey>,
	options?: SubscriptionsOptions<EntityType>
) => VoidFunction;

export interface SubscriptionsOptions<EntityType extends string> {
	entityType?: EntityType; // to limit the subscription only to specific entityType
}

export interface Subscription<EntityType extends string, MenuKey extends string> {
	callback: SubscriptionCallback<MenuKey>;
	options: SubscriptionsOptions<EntityType>;
}

export type Subscriptions<EntityType extends string, MenuKey extends string> = {
	[key: string]: Subscription<EntityType, MenuKey>;
};

export type SubscriptionCallback<MenuKey extends string, D = any, AO = AdditionalSubscriptionCbOptions> = (
	data: D,
	entityActionsManager: EntityActionsManager<MenuKey>,
	additionalOptions?: AO
) => void;

export interface AdditionalSubscriptionCbOptions {
	[key: string]: any;
}

export interface EntityActionsData<EntityType extends string, MenuKey extends string> {
	subscribe: SubscribeFn<EntityType, MenuKey>;
	subscriptions: Subscriptions<EntityType, MenuKey>;
}

export interface EntityActions<EntityType extends string, MenuKey extends string> {
	subscribe: SubscribeFn<EntityType, MenuKey>;
	getSubscriptions: (options?: SubscriptionsOptions<EntityType>) => Subscriptions<EntityType, MenuKey>;
}

export interface UpdateSubscriptionProps<EntityType extends string, MenuKey extends string> {
	id: string;
	callback?: SubscriptionCallback<MenuKey>;
	options?: SubscriptionsOptions<EntityType>;
	action?: 'add' | 'remove';
}
