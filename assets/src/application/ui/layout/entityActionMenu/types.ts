import React from 'react';

export interface EntityActionsManager<MenuKey extends string> {
	registerMenuItem: (key: MenuKey, render: () => React.ReactNode) => void;
	unRegisterMenuItem: (key: MenuKey) => void;
	getMenuItems: () => EntityMenuItems<MenuKey>;
}

export type EntityMenuItems<MenuKey extends string> = {
	// menuKey: render()
	[K in MenuKey]?: React.ReactNode;
};

export type MenuRegistry<EntityType extends string = '', MenuKey extends string = ''> = {
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

export type SubscriptionCallback<MenuKey extends string, D = any> = (
	data: D,
	entityActionsManager: EntityActionsManager<MenuKey>
) => void;

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
