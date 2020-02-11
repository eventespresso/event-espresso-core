import React from 'react';

export type EntityActionsManagerHook<EntityType extends string, MenuKey extends string> = (
	entityType: EntityType,
	entityId: string
) => EntityActionsManager<MenuKey>;

export interface EntityActionsManager<MenuKey extends string> {
	registerMenuItem: (key: MenuKey, render: () => React.ReactNode) => void;
	unRegisterMenuItem: (key: MenuKey) => void;
	getMenuItems: () => EntityMenuItems<MenuKey>;
}

export type EntityMenuItems<MenuKey extends string> = {
	// menuKey: render()
	[K in MenuKey]?: React.ReactNode;
};

export type MenuRegistry<EntityType extends string, MenuKey extends string> = {
	[K in EntityType]?: {
		// entityId
		[key: string]: EntityMenuItems<MenuKey>;
	};
};

export type SubscribeFn<MenuKey extends string = ''> = (cb: SubscriptionCallback<MenuKey>) => VoidFunction;

export type Subscriptions<MenuKey extends string = ''> = {
	[key: string]: SubscriptionCallback<MenuKey>;
};

export type SubscriptionCallback<MenuKey extends string = '', D = any> = (
	data: D,
	entityActionsManager: EntityActionsManager<MenuKey>
) => void;

export interface EntityActionsData<MenuKey extends string = ''> {
	subscribe: SubscribeFn<MenuKey>;
	subscriptions: Subscriptions<MenuKey>;
}

export interface EntityActions<MenuKey extends string> {
	subscribe: SubscribeFn<MenuKey>;
	getSubscriptions: () => Subscriptions<MenuKey>;
}

export interface UpdateSubscriptionProps<MenuKey extends string = ''> {
	id: string;
	callback: SubscriptionCallback<MenuKey>;
	action?: 'add' | 'remove';
}
